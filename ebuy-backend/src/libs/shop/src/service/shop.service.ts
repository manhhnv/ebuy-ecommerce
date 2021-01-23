import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "../../../../generate-types";
import { Shop, ShopDocument } from "../schema/shop.schema";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ShopService {

    constructor(
        @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    ) { }

    async verifyToken(authorization: string) {
        if (authorization.split(' ')[0] != 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
        const token = authorization.split(' ')[1];
        try {
            const user: any = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            return user;
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }

    async createShop(
        brandName: string, phoneNumbers: string[],
        shopEmails: string[], streetLine1: string,
        province: string, state: string,
        avatar: string, banner: string, authorization: string,
        metaDescription: string, metaKeyword: string,
        streetLine2?: string,
    ) {
        const user: User = await this.verifyToken(authorization)
        const shop = new this.shopModel({
            brandName: brandName,
            phoneNumbers: phoneNumbers,
            shopEmails: shopEmails,
            avatar: avatar,
            banner: banner,
            owner: Types.ObjectId(user._id),
            streetLine1: streetLine1,
            streetLine2: streetLine2,
            province: Types.ObjectId(province),
            state: Types.ObjectId(state),
            metaDescription: metaDescription,
            metaKeyword: metaKeyword,
        })
        await shop.save();
        console.log("SHOP", shop)
        const instanceShop = await this.shopModel.findById(shop._id)
            .populate('owner')
            .populate('province')
            .populate('state')
            ;
        return instanceShop;
    }
    async updateShop(
        brandName: string, avatar?: string, banner?: string
    ) {
        const olderDocument = await this.shopModel.findOne();
        const shop = await olderDocument.updateOne({
            brandName: brandName,
            avatar: avatar != null ? avatar : olderDocument.avatar,
            banner: banner != null ? banner : olderDocument.banner
        }, { new: true })
        return shop;
    }
    async getShopDetail(_id: string) {
        try {
            return await this.shopModel.findById(_id)
                .populate('owner')
                .populate('province')
                .populate('state')
                ;
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
}