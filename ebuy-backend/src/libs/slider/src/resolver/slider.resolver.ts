import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SliderService } from '../service/slider.service';
import { SliderInput, SliderUpdate } from 'src/generate-types';

@Resolver('Slider')
export class SliderResolver {
    constructor(private sliderService: SliderService)
    {}

    @Mutation()
    createSlider(@Args('input') input: SliderInput) {
        return this.sliderService.createSlider(input)
    }

    @Mutation()
    updateSlider(@Args('_id')_id: string, @Args('update') update: SliderUpdate) {
        return this.sliderService.updateSlider(_id, update)
    }

    @Query()
    getSliders() {
        return this.sliderService.getSliders()
    }
}