import { ApiProperty } from '@nestjs/swagger';
import { VariantBase } from './variant-base.doc';
export class ProductVariantInput extends VariantBase{

    @ApiProperty({
        type: String,
        description: "Product ID",
        required: true,
    })
    productId: string

    @ApiProperty({
        type: 'file',
        required: true,
        description: "Product variant's preview image"
    })
    preview: any
    
}
export class ProductVariantUpdate extends VariantBase {
    @ApiProperty({
        type: String,
        description: "Product variant's ID",
        required: true,
    })
    variantId: string

    @ApiProperty({
        type: 'file',
        required: false,
        description: "Product variant's preview image"
    })
    preview: any
}