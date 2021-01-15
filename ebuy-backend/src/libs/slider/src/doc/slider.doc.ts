import { ApiProperty } from '@nestjs/swagger';

export class SliderConfig {

    @ApiProperty({
        type: String,
        required: true,
        description: "Slider title",
    })
    title: string

    @ApiProperty({
        type: String,
        description: "Slider sub title",
        required: true
    })
    subTitle: string

    @ApiProperty({
        type: 'file',
        description: "Slider image",
        required: true
    })
    image: any

    @ApiProperty({
        type: Number,
        description: "Slider width"
    })
    width: number

    @ApiProperty({
        type: Number,
        description: "Slider height"
    })
    height: number
    
    @ApiProperty({
        type: String,
        required: true,
        description: "Slider type Asset, only in : IMAGE, VIDEO"
    })
    typeAsset: string
}