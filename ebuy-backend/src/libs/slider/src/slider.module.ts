import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderSchema } from './schema/slider.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Slider.name, schema: SliderSchema}
        ])
    ]
})
export class SlideModule {}