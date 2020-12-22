import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType} from '@nestjs/graphql';
import { IsEmail, Min, Matches } from 'class-validator';

@ObjectType()
@Schema()
export class User {
    @Field(() => String)
    _id: Types.ObjectId

    @Field(() => String)
    @Min(8)
    @Prop({type: String, required: true, unique: true})
    username: string

    @Field(() => String)
    @Matches('/^([a-zA-Z]+\s)*[a-zA-Z]+$/')
    @Prop({type: String, required: true})
    firstName: string

    @Field(() => String)
    @Matches('/^([a-zA-Z]+\s)*[a-zA-Z]+$/')
    @Prop({type: String, required: true})
    lastName: string

    @Field(() => String)
    @IsEmail()
    @Prop({type: String, required: true, unique: true})
    email: string

    @Field(() => String)
    @Min(8)
    @Prop({type: String, required: true})
    password: string

    @Field(() => Boolean)
    @Prop({type: Boolean, default: true})
    active: boolean

    @Field(() => Date)
    @Prop({type: Date, default: Date.now()})
    createdAt: Date

    @Field(() => Date)
    @Prop({type: Date, default: Date.now()})
    updatedAt: Date
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)