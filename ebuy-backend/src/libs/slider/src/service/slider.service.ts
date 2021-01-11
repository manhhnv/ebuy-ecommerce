import {
    Injectable, InternalServerErrorException,
    HttpException, HttpStatus
} from '@nestjs/common';
import { Slider, SliderDocument } from '../schema/slider.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SliderInput, SliderUpdate } from 'src/generate-types';

@Injectable()
export class SliderService {
    constructor(
        @InjectModel(Slider.name) private sliderModel: Model<SliderDocument>,
    )
    {}

    async getSliders(): Promise<Slider[] | undefined> {
        try {
            const sliders = await this.sliderModel.find()
            return sliders
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }

    async createSlider(sliderInput: SliderInput): Promise<Slider[] | undefined> {
        try {
            const slider = new this.sliderModel(sliderInput)
            await slider.save()
            return this.getSliders()
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }

    async addSliderImage(_id: string, imageURL: string) {
        try {
            const slider = await this.sliderModel.findByIdAndUpdate(
                Types.ObjectId(_id),
                {
                    url: imageURL,
                },
                {
                    new: true
                }
            )
            return slider
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'An error occurred while processing request')
        }
    }
    async updateSlider(sliderId: string, updateFields: SliderUpdate): Promise<Slider[] | undefined> {
        try {
            await this.sliderModel.updateOne(
                {
                    _id: Types.ObjectId(sliderId)
                },
                updateFields
            )
            return await this.getSliders()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
}