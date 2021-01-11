import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SliderService } from '../service/slider.service';
import { SliderInput } from 'src/generate-types';

@Resolver('Slider')
export class SliderResolver {
    constructor(private sliderService: SliderService)
    {}

    @Mutation()
    createSlider(@Args('input') input: SliderInput) {
        return this.sliderService.createSlider(input)
    }
}