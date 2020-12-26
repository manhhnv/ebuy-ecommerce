import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Schema()
export class Token {
    @Field(() => String)
    @Prop({required: true, type: String})
    userId: string | any

    @Field(() => String)
    @Prop({required: true, type: String})
    tokenId: string | any

    @Field(() => String)
    @Prop({type: String, required: true})
    exprideDate: Date | any
}

export type TokenDocument = Token & Document
export const TokenSchema = SchemaFactory.createForClass(Token)