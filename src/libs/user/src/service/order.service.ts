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
        private varientService: ProductVariantService
    ) { }

    async addItemToOrder(userId: string, variantId: string, quantity: number): Promise<Order | any> {
        try {
            let currentOrder = await this.orderModel.findOne({
                userId: userId,
                status: true,
                state: 'Adding Item'
            })
            if (!currentOrder) {
                let orderLine = [];
                let newOrder = new this.orderModel();
                const productVariant = await this.varientService.getVariant(Types.ObjectId(variantId));
                if (!productVariant) {
                    throw new HttpException('Can not find product', HttpStatus.BAD_REQUEST)
                }
                const currentUser = await this.userModel.findById(Types.ObjectId(userId))
                if (!currentUser) {
                    throw new HttpException('You not login', HttpStatus.UNAUTHORIZED)
                }

                const newOrderLine = new this.orderLineModel();
                newOrderLine.productVariantId = variantId
                newOrderLine.orderId = newOrder.id
                newOrderLine.quantity = quantity
                newOrderLine.total = quantity * productVariant.price
                const newOrderLineResult = await newOrderLine.save()
                const mergedOrderLine = {...newOrderLineResult, ...productVariant}
                /**Add order line to order */
                newOrder.totalQuantity += quantity
                newOrder.subTotal += newOrderLine.total
                newOrder.total += newOrderLine.total
                orderLine.push(mergedOrderLine)
                newOrder['lines'] = orderLine
                newOrder['user'] = currentUser
                const newOrderResult = await newOrder.save()
                console.log("New Order", newOrderResult)
                return newOrderLineResult
            }
        }
        catch(e) {
            throw new InternalServerErrorException('AN ERROR OCCURRED IN PROCESS')
        }
    }
}