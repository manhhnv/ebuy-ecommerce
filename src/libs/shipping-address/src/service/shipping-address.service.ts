import {
    Injectable, HttpException, InternalServerErrorException,
    HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingAddress, ShippingAddressDocument } from '../schema/shipping-address.schema';
import { Types, Model } from 'mongoose';
import { ShippingAddressArgs, ListAddress } from 'src/generate-types';
@Injectable()
export class ShippingAddressService {
    constructor(
        @InjectModel(ShippingAddress.name) private shippingAddressModel: Model<ShippingAddressDocument>
    ){}
    
    async listAShippingAddress(userId: string): Promise<ListAddress | undefined> {
        try {
            const listAddress = await this.shippingAddressModel.find({
                user: Types.ObjectId(userId)
            })
            return {
                items: listAddress,
                totalItems: listAddress.length
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }

    async createShippingAddress(userId: string, input: ShippingAddressArgs): Promise<ListAddress | undefined> {
        try {
            const shippingAddress = new this.shippingAddressModel(input)
            shippingAddress.user = Types.ObjectId(userId)
            await shippingAddress.save()
            return this.listAShippingAddress(userId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
}