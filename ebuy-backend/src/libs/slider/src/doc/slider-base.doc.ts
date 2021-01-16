import { ApiProperty } from '@nestjs/swagger';

export class SliderBase {

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
        type: Number,
        description: "Slider width"
    })
    width: number

    @ApiProperty({
        type: Number,
        description: "Slider height"
    })
    height: number
    

}