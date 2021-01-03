import {
    Injectable, HttpException, HttpStatus, InternalServerErrorException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schema/order.schema';
import { OrderLine, OrderLineDocument } from '../schema/orderLine.schema';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { ProductVariantService } from 'src/libs/product/src/service/product-variant.service';
import { Types } from 'mongoose';
@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(OrderLine.name) private orderLineModel: Model<OrderLineDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private variantService: ProductVariantService
    ) { }
    
    async adjustItem(orderId: string, orderLineId: string, variantId: string, adjustQuantity: number) {
        try {
            const variant = await this.variantService.getVariant(Types.ObjectId(variantId))
            if (!variant) {
                throw new HttpException('Product variant not found', HttpStatus.NOT_FOUND)
            }
            if (variant.inStock <= 0) {
                throw new HttpException('Sold Out', HttpStatus.BAD_REQUEST)
            }
            const order = await this.orderModel.findById(Types.ObjectId(orderId))
            const orderLine = await this.orderLineModel.findById(Types.ObjectId(orderLineId))
            if (!order) {
                throw new InternalServerErrorException('Add item before adjust cart')
            }
            if (!orderLine) {
                throw new HttpException('This item is not in the cart', HttpStatus.BAD_REQUEST)
            }
            if (orderLine.quantity + adjustQuantity <= 0) {
                // Remove from cart...
            }
            else {
                const updateOrderLine = await orderLine.updateOne({
                    quantity: orderLine.quantity + adjustQuantity,
                    total: (orderLine.quantity + adjustQuantity) * variant.price
                })
                const updateOrder = await order.updateOne({
                    totalQuantity: order.totalQuantity + adjustQuantity,
                    subTotal: order.subTotal + adjustQuantity * variant.price,
                    total: order.total + adjustQuantity * variant.price,
                    updatedAt: new Date()
                })
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'AN ERROR OCCURRED IN PROCESS')
        }
    }
    async addItemToOrder(userId: string, variantId: string, quantity: number): Promise<Order | any> {
        try {
            if (quantity <= 0) {
                throw new HttpException('Order quantity must be greater 0', HttpStatus.BAD_REQUEST)
            }
            let currentOrder = await this.orderModel.findOne({
                userId: userId,
                status: true,
                state: 'Adding Item'
            })
            const productVariant = await this.variantService.getVariant(Types.ObjectId(variantId));
            if (!productVariant) {
                throw new HttpException('Can not find product', HttpStatus.BAD_REQUEST)
            }
            else if (productVariant.inStock <= 0) {
                throw new HttpException('Sold Out', HttpStatus.BAD_REQUEST)
            }
            //Initital orderline [] and may be chaneged if current order already exists
            if (currentOrder === null) {
                const currentUser = await this.userModel.findById(Types.ObjectId(userId))
                if (!currentUser) {
                    throw new HttpException('You not logged in', HttpStatus.UNAUTHORIZED)
                }
                let newOrder = new this.orderModel({
                    userId: currentUser._id
                });
                const newOrderLine = new this.orderLineModel({
                    productVariant: Types.ObjectId(variantId),
                    orderId: Types.ObjectId(newOrder._id),
                    quantity: quantity,
                    total: quantity * productVariant.price
                });
                await newOrderLine.save()
                newOrder.totalQuantity += quantity
                newOrder.subTotal += newOrderLine.total
                newOrder.total += newOrderLine.total
                await newOrder.save()
                return this.getActiveOrder(userId);
            }
            else {
                
                const lines = await this.orderLineModel.findOne({
                    orderId: Types.ObjectId(currentOrder._id),
                    productVariant: Types.ObjectId(variantId)
                })
                if (!lines) {
                    const newOrderLine = new this.orderLineModel({
                        productVariant: Types.ObjectId(variantId),
                        orderId: currentOrder._id,
                        quantity: quantity,
                        total: quantity * productVariant.price
                    })
                    const newOrderLineResult = await newOrderLine.save();

                    /**Add order line to order */
                    await currentOrder.updateOne({
                        totalQuantity: currentOrder.totalQuantity + quantity,
                        subTotal: currentOrder.subTotal + newOrderLineResult.total,
                        total: currentOrder.total + newOrderLineResult.total
                    })
                }
                else {
                    await this.adjustItem(currentOrder._id, lines._id, variantId, quantity)
                }
                return this.getActiveOrder(userId);
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'AN ERROR OCCURRED IN PROCESS')
        }
    }
    async getActiveOrder(userId: string) {
        return await this.orderModel.findOne({
            userId: userId
        })
    }
    async removeOrderLine(userId: string, orderLineId: string) {
        try {
            const orderLine = await this.orderLineModel.findById(orderLineId);
            const order = await this.orderModel.findOne({
                userId: userId
            })
            await order.updateOne({
                totalQuantity: order.totalQuantity - orderLine.quantity,
                total: order.total - orderLine.total,
                subTotal: order.subTotal - orderLine.total,
                updatedAt: new Date()
            })
            await orderLine.remove();
            return this.getActiveOrder(userId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'AN ERROR OCCURRED IN PROCESS')
        }
    }
    async incrementOrderItem(userId: string, orderLineId: string) {
        try {
            const order = await this.orderModel.findOne({
                userId: userId
            })
            const orderLine = await this.orderLineModel.findOne({
                orderId: order._id,
                _id: orderLineId
            })
            const price = (orderLine.total/orderLine.quantity)
            await orderLine.updateOne({
                quantity: orderLine.quantity + 1,
                total: orderLine.total + price,
                updatedAt: new Date()
            })
            await order.updateOne({
                totalQuantity: order.totalQuantity + 1,
                total: order.total + price,
                subTotal: order.subTotal + price,
                updatedAt: new Date()
            })
            return this.getActiveOrder(userId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'AN ERROR OCCURRED IN PROCESS')
        }
    }
    async decreaseOrderItem(userId: string, orderLineId: string) {
        try {
            const order = await this.orderModel.findOne({
                userId: userId
            })
            const orderLine = await this.orderLineModel.findOne({
                orderId: order._id,
                _id: orderLineId
            })
            const price = (orderLine.total/orderLine.quantity)
            const modifiedQuantity = orderLine.quantity - 1;
            if (modifiedQuantity <= 0) {
                return this.removeOrderLine(userId, orderLineId)
            }
            else {
                await orderLine.updateOne({
                    quantity: modifiedQuantity,
                    total: modifiedQuantity * price,
                    updatedAt: new Date()
                })
                await order.updateOne({
                    totalQuantity: order.totalQuantity - 1,
                    total: order.total - price,
                    subTotal: order.subTotal - price,
                    updatedAt: new Date()
                })
                return this.getActiveOrder(userId)
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'AN ERROR OCCURRED IN PROCESS')
        }
    }
    async orderLinesByOrderId(orderId: Types.ObjectId) {
        const lines = await this.orderLineModel.find({
            orderId: orderId
        })
        .populate('productVariant')
        return lines
    }
}