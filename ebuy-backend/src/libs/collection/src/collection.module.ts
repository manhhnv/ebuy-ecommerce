import { Module } from '@nestjs/common';
import { CollectionService } from './service/collection.service';
import { Collection, CollectionSchema } from './schema/collection.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionResolver } from './resolver/collection.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Collection.name, schema: CollectionSchema},
        ])
    ],
    providers: [CollectionService, CollectionResolver],
    exports: [CollectionService]
})
export class CollectionModule {}