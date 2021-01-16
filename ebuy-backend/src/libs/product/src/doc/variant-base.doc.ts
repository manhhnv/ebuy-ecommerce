import { ApiProperty } from '@nestjs/swagger';

export class VariantBase {

    @ApiProperty({
        type: Number,
        description: "Product variant's quantity in stock",
        required: true,
        default: 0
    })
    inStock: number

    @ApiProperty({
        type: String,
        description: "Product variant's SKU",
        required: true,
    })
    sku: string

    @ApiProperty({
        type: String,
        description: "Product variant's name",
        required: true,
    })
    name: string

    @ApiProperty({
        type: Number,
        description: "Product variant's price",
        required: true
    })
    price: number

    @ApiProperty({
        type: Boolean,
        required: false,
    })
    active: boolean

    @ApiProperty({
        type: String,
        required: false,
    })
    color: string

    @ApiProperty({
        type: Number,
        required: false,
    })
    width: number

    @ApiProperty({
        type: Number,
        required: false,
    })
    height: number

    @ApiProperty({
        type: Number,
        required: false,
    })
    weight: number

}