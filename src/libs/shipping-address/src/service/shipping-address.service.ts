import {
    Injectable, HttpException, InternalServerErrorException,
    HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingAddress, ShippingAddressDocument } from '../schema/shipping-address.schema';
import { Types, Model } from 'mongoose';
import { ShippingAddressArgs, ListAddress, ShippingAddress as ShippingAddressGraphQL} from 'src/generate-types';
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

    async removeShippingAddress(userId: string, addressId: string): Promise<ListAddress | undefined> {
        try {
            await this.shippingAddressModel.findOneAndDelete({
                _id: Types.ObjectId(addressId),
                user: Types.ObjectId(userId)
            })
            return this.listAShippingAddress(userId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }

    async setAsDefaultAddress(userId: string, addressId: string): Promise<ListAddress | undefined> {
        try {
            const shippingAddress = await this.shippingAddressModel.findOne({
                user: Types.ObjectId(userId),
                _id: Types.ObjectId(addressId)
            })
            if (!shippingAddress) {
                throw new HttpException('Can not find shipping address', HttpStatus.BAD_REQUEST)
            }
            await this.shippingAddressModel.update(
                {
                    user: Types.ObjectId(userId),
                    defaultAddress: true
                },
                {
                    defaultAddress: false
                }
            )
            await shippingAddress.updateOne({
                defaultAddress: true
            })
            return this.listAShippingAddress(userId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
    async getShippingAddressDetail(userId: string, id: string): Promise<ShippingAddressGraphQL | undefined> {
        try {
            return this.shippingAddressModel.findOne({
                user: Types.ObjectId(userId),
                _id: Types.ObjectId(id)
            })
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
}