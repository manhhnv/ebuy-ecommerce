import {
    Injectable, HttpException, InternalServerErrorException,
    HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingAddress, ShippingAddressDocument } from '../schema/shipping-address.schema';
import { Types, Model } from 'mongoose';
import {
    ShippingAddressArgs, ListAddress,
    ShippingAddress as ShippingAddressGraphQL,
    UpdateShippingAddressInput, ListProvince, ListState
} from '../../../../generate-types';
import { Province, ProvinceDocument } from '../schema/province.schema';
import { State, StateDocument } from '../schema/state.schema';
@Injectable()
export class ShippingAddressService {
    constructor(
        @InjectModel(ShippingAddress.name) private shippingAddressModel: Model<ShippingAddressDocument>,
        @InjectModel(Province.name) private provinceModel: Model<ProvinceDocument>,
        @InjectModel(State.name) private stateModel: Model<StateDocument>,
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
    async getShippingAddressDetail(userId: string, id: Types.ObjectId): Promise<ShippingAddressGraphQL | undefined> {
        try {
            return this.shippingAddressModel.findOne({
                user: Types.ObjectId(userId),
                _id: id
            })
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
    async getDefaultAddress(userId: string): Promise<ShippingAddressGraphQL | undefined> {
        try {
            return this.shippingAddressModel.findOne({
                user: Types.ObjectId(userId),
                defaultAddress: true
            })
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
    async updateShippingAddress(userId: string, addressId: string, updateInfo: UpdateShippingAddressInput): Promise<ListAddress | undefined> {
        try {
            const shippingAddress = await this.shippingAddressModel
                .findOneAndUpdate(
                    {
                        user: Types.ObjectId(userId),
                        _id: Types.ObjectId(addressId)
                    },
                    updateInfo
                )
            return await this.listAShippingAddress(userId)
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
    async eligibleProvince(): Promise<ListProvince> {
        try {
            const provinces = await this.provinceModel.find();
            console.log(provinces)
            return {
                provinces: provinces,
                totalItems: provinces.length
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'Error')
        }
    }
    async eligibleState(provinceId: number): Promise<ListState> {
        try {
            const states = await this.stateModel.find({
                provinceId: provinceId
            })
            return {
                states: states,
                totalItems: states.length
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'Error')
        }
    }
}