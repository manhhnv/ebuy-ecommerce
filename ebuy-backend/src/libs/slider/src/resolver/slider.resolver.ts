import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SliderService } from '../service/slider.service';
import { SliderInput, SliderUpdate } from '../../../../generate-types';

@Resolver('Slider')
export class SliderResolver {
    constructor(private sliderService: SliderService)
    {}

    @Query()
    getSliders() {
        return this.sliderService.getSliders()
    }
}