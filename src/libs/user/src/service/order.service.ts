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
import { OrderedVariant } from '../../types';
@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(OrderLine.name) private orderLineModel: Model<OrderLineDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private variantService: ProductVariantService
    ) { }
    
    async adjustItem(orderLineId: string, variantId: string, adjustQuantity: number) {
        try {
            const variant = await this.variantService.getVariant(Types.ObjectId(variantId))
            if (!variant) {
                throw new HttpException('Product variant not found', HttpStatus.NOT_FOUND)
            }
            const orderLine = await this.orderLineModel.findById(Types.ObjectId(orderLineId))
            if (!orderLine) {
                throw new HttpException('This item is not in the cart', HttpStatus.BAD_REQUEST)
            }
            // const modified = 
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'AN ERROR OCCURRED IN PROCESS')
        }
    }
    async addItemToOrder(userId: string, variantId: string, quantity: number): Promise<Order | any> {
        try {
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
            let items = [];
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
                console.log(newOrderLine)
                await newOrderLine.save()
                newOrder.totalQuantity += quantity
                newOrder.subTotal += newOrderLine.total
                newOrder.total += newOrderLine.total
                console.log(newOrder)
                await newOrder.save()
                return newOrder
            }
            else {
                
                const lines = await this.orderLineModel.find({
                    orderId: currentOrder._id
                })
                console.log(currentOrder._id)
                // console.log(lines)
                await this.orderLineModel.find({
                    orderId: currentOrder._id
                })
                .populate('productVariant')
                .exec((err, lines) => {
                    if (err) {
                        throw new HttpException(err, HttpStatus.BAD_REQUEST)
                    }
                    const { name, sku, price, active, inStock }: any = lines[0].productVariant
                    console.log(name)
                })
                const orderLine = lines.find(item => item.productVariant == Types.ObjectId(variantId) && item.orderId == currentOrder._id)
                if (!orderLine) {
                    const newOrderLine = new this.orderLineModel()
                    newOrderLine.productVariant = Types.ObjectId(variantId);
                    newOrderLine.orderId = currentOrder._id;
                    newOrderLine.quantity = quantity;
                    newOrderLine.total = quantity * productVariant.price;
                    const newOrderLineResult = await newOrderLine.save();
                    const mergedOrderLine = {...newOrderLineResult, ...productVariant}

                    /**Add order line to order */
                    await currentOrder.updateOne({
                        totalQuantity: currentOrder.totalQuantity + quantity,
                        subTotal: currentOrder.subTotal + newOrderLineResult.total,
                        total: currentOrder.total + newOrderLineResult.total
                    })
                    const orderDidUpdate = await this.orderModel.findById(currentOrder._id)
                    // return this.orderModel.findById(currentOrder._id)
                }
            }
            // else {
            //     console.log(currentOrder._id)
            //     const orderLine = await this.orderLineModel.findOne({
            //         productVariantId: variantId,
            //         orderId: currentOrder._id
            //     })
            //     if (!orderLine) {
            //         const newOrderLine = new this.orderLineModel();
            //         newOrderLine.productVariantId = variantId
            //         newOrderLine.orderId = currentOrder.id
            //         newOrderLine.quantity = quantity
            //         newOrderLine.total = quantity * productVariant.price
            //         const newOrderLineResult = await newOrderLine.save()
            //     }
            // }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'AN ERROR OCCURRED IN PROCESS')
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