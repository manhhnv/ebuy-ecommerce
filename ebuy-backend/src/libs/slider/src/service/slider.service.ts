import {
    Injectable, InternalServerErrorException,
    HttpException, HttpStatus
} from '@nestjs/common';
import { Slider, SliderDocument } from '../schema/slider.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SliderInput, SliderUpdate, TypeAsset } from '../../../../generate-types';

@Injectable()
export class SliderService {
    constructor(
        @InjectModel(Slider.name) private sliderModel: Model<SliderDocument>,
    ) { }

    async getSliders(): Promise<Slider[] | undefined> {
        try {
            const sliders = await this.sliderModel.find()
            return sliders
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }

    async createSlider(
        title: string, subTitle: string,
        url: string, typeAsset: string,
        width?: number, height?: number
    ): Promise<Slider[] | undefined> {
        try {
            const slider = new this.sliderModel({
                title: title,
                subTitle: subTitle,
                url: url,
                typeAsset: typeAsset,
                width: width,
                height: height
            });
            await slider.save();
            return this.getSliders()
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }

    async updateSlider(
        sliderId: string, title: string, subTitle: string,
        url?: string, typeAsset?: TypeAsset,
        width?: number, height?: number
    ): Promise<Array<Slider> | undefined> {
        try {
            const olderDocument = await this.sliderModel.findById(sliderId);
            if (!olderDocument) {
                throw new HttpException('Slider not found', HttpStatus.NOT_FOUND)
            }
            await olderDocument.updateOne({
                title: title,
                subTitle: subTitle,
                url: url != null ? url : olderDocument.url,
                typeAsset: typeAsset || olderDocument.typeAsset,
                width: width || olderDocument.width,
                height: height || olderDocument.height
            })
            return this.getSliders()
        }
        catch (e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
}