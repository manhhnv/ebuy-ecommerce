import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType} from '@nestjs/graphql';
import { IsEmail, MinLength, Matches, IsPhoneNumber } from 'class-validator';

@ObjectType()
@Schema()
export class User {
    @Field(() => String)
    _id: Types.ObjectId | string

    @Field(() => String)
    @MinLength(8)
    @Prop({type: String, required: true, unique: true})
    username: string

    @Field(() => String)
    @Matches('/^([a-zA-Z]+\s)*[a-zA-Z]+$/')
    @Prop({type: String, required: true})
    firstName: string

    @Field(() => String)
    @Matches('/^([a-zA-Z]+\s)*[a-zA-Z]+$/')
    @Prop({type: String, required: false, default: ''})
    lastName: string

    @Field(() => String)
    @IsEmail()
    @Prop({type: String, required: true, unique: true,})
    email: string

    @Field(() => String)
    @IsPhoneNumber('VN')
    @Prop({type: String, required: true})
    phoneNumber: string
    
    @Field(() => String)
    @Prop({type: String, required: false, default: null})
    avatarURL: string

    @Field(() => String)
    @MinLength(8)
    @Prop({type: String, required: true, minlength: 8})
    password: string

    @Field(() => String)
    @Prop({type: String, default: "VN", required: true})
    countryCode: string

    @Field(() => String)
    @Prop({type: String, default: "VND", required: true})
    currency: string

    @Field(() => Boolean)
    @Prop({type: Boolean, default: true})
    active: boolean

    @Prop({type: Boolean, required: true, default: false})
    isAdmin: boolean

    @Field(() => Date)
    @Prop({type: Date, default: Date.now()})
    createdAt: Date

    @Field(() => Date)
    @Prop({type: Date, default: Date.now()})
    updatedAt: Date
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)