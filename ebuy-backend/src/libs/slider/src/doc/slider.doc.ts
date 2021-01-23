import { ApiProperty } from '@nestjs/swagger';
import { TypeAsset } from '../../../../generate-types';
import { SliderBase } from './slider-base.doc';
export class SliderConfig extends SliderBase {

    @ApiProperty({
        type: 'file',
        description: "Slider image",
        required: true
    })
    image: any
    
    @ApiProperty({
        type: String,
        required: true,
        description: "Slider type Asset, only in : IMAGE, VIDEO"
    })
    typeAsset: TypeAsset
}

export class SliderUpdate extends SliderBase {

    @ApiProperty({
        type: String,
        required: true,
        description: "Slider ID"
    })
    sliderId: string

    @ApiProperty({
        type: 'file',
        description: "Slider image",
        required: false
    })
    image: any
    
    @ApiProperty({
        type: String,
        required: false,
        description: "Slider type Asset, only in : IMAGE, VIDEO"
    })
    typeAsset: TypeAsset
}