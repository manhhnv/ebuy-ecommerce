import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile,
    Param, Res, UseGuards, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from '../../../../utils/validation';
import { editFileName } from '../../../../utils/validation';
import { SliderService } from '../service/slider.service';
import { SliderConfig, SliderUpdate } from '../doc/slider.doc';
import { PoliciesGuard } from '../../../../shared/policy/policies.guard';
import { CheckPolicies } from '../../../../shared/policy/policy.decorator';
import { SliderPolicy } from '../../../../shared/policy';
import { Action } from '../../../../shared/casl/action.enum';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
@ApiTags('Slider')
@Controller('slider')
export class SliderController {
    constructor(private sliderService: SliderService) {

    }
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new SliderPolicy(Action.Manage))
    @Post('upload/slider-image')
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiBearerAuth()
    @ApiBody({ type: SliderConfig })
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/asset/home/slider',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    async createSlider(@UploadedFile() image, @Body() body: SliderConfig) {
        const url = `${process.env.HOST}:${process.env.PORT}/slider/image/${image.filename}`;
        const { title, subTitle, width, height, typeAsset } = body;
        return this.sliderService.createSlider(
            title, subTitle, url, typeAsset, width, height
        )
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new SliderPolicy(Action.Manage))
    @Post('update')
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiBearerAuth()
    @ApiBody({ type: SliderUpdate })
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/asset/home/slider',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    async updateSlider(@UploadedFile() image, @Body() body: SliderUpdate) {
        const { sliderId, title, subTitle, width, height, typeAsset } = body;

        if (image) {
            const url = `${process.env.HOST}:${process.env.PORT}/slider/image/${image.filename}`;
            return this.sliderService.updateSlider(
                sliderId, title, subTitle, url,
                typeAsset, width, height
            )
        }
        return this.sliderService.updateSlider(
            sliderId, title, subTitle, null,
            typeAsset, width, height
        )
    }

    @Get('image/:path')
    viewSliderImage(@Param('path') image, @Res() res) {
        return res.sendFile(image, { root: './uploads/asset/home/slider' })
    }
}