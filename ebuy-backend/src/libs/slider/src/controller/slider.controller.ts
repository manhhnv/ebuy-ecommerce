import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile,
    Param, Res, UseGuards, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/utils/validation';
import { editFileName } from 'src/utils/validation';
import { SliderService } from '../service/slider.service';
import { SliderConfig } from '../doc/slider.doc';
import { PoliciesGuard } from 'src/libs/policy/policies.guard';
import { CheckPolicies } from 'src/libs/policy/policy.decorator';
import { SliderPolicy } from 'src/libs/policy';
import { Action } from 'src/libs/casl/action.enum';
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

    @Get('image/:path')
    viewSliderImage(@Param('path') image, @Res() res) {
        return res.sendFile(image, {root: './uploads/asset/home/slider'})
    }
}