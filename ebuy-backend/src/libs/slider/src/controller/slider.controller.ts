import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile,
    Req, Param, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/utils/validation';
import { editFileName } from 'src/utils/validation';
import { Request } from 'express';
import { SliderService } from '../service/slider.service';
@Controller('slider')
export class SliderController {
    constructor(private sliderService: SliderService) {

    }

    @Post('upload/slider-image')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/asset/home/slider',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    async uploadSliderImage(@UploadedFile() image, @Req() request: Request) {
        const {_id} = request.body
        const url = `${process.env.HOST}:${process.env.PORT}/slider/image/${image.filename}`
        return await this.sliderService.addSliderImage(_id, url)
    }

    @Get('image/:path')
    viewSliderImage(@Param('path') image, @Res() res) {
        return res.sendFile(image, {root: './uploads/asset/home/slider'})
    }
}