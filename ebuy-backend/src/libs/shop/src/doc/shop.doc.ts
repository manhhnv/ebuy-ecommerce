import { ApiProperty } from '@nestjs/swagger';

export class ShopCreate {

    @ApiProperty({
        type: String,
        required: true,
        description: "Brand name"
    })
    brandName: string

    @ApiProperty({
        type: [String],
        required: true,
        description: "Phone Numbers (array)"
    })
    phoneNumbers: string[];

    @ApiProperty({
        type: [String],
        required: true,
        description: "Contact email"
    })
    shopEmails: string[]

    @ApiProperty({
        type: String,
        required: true,
        description: "Province ID"
    })
    province: string

    @ApiProperty({
        type: String,
        required: true,
        description: "State ID"
    })
    state: string

    @ApiProperty({
        type: String,
        required: true,
        description: "Street line address one"
    })
    streetLine1: string

    @ApiProperty({
        type: String,
        required: false,
        description: "Street line address two"
    })
    streetLine2: string

    @ApiProperty({
        type: 'file',
        name: 'avatar',
        description: "Avatar for shop",
        required: false
    })
    avatar: any

    @ApiProperty({
        type: 'file',
        name: 'banner',
        description: "Banner image for shop",
        required: false
    })
    banner: any

    @ApiProperty({
        type: String,
        name: 'metaDescription',
        description: "Shop Description for SEO",
        required: true
    })
    metaDescription: string

    @ApiProperty({
        type: String,
        name: 'metaKeyword',
        description: "Search key words for SEO",
        required: true
    })
    metaKeyword: string
}