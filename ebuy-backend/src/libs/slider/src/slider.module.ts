import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderSchema } from './schema/slider.schema';
import { SliderService } from './service/slider.service';
import { SliderResolver } from './resolver/slider.resolver';
import { SliderController } from './controller/slider.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Slider.name, schema: SliderSchema}
        ]),
        MulterModule.register({
            dest: './uploads/asset/home/slider'
        })
    ],
    providers: [
        SliderService, SliderResolver
    ],
    controllers: [SliderController]
})
export class SlideModule {}