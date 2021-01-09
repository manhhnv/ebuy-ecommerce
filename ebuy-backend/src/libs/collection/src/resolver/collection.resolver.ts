import { Resolver } from '@nestjs/graphql';
import { CollectionService } from '../service/collection.service';

@Resolver()
export class CollectionResolver {
    constructor(
        private collectionService: CollectionService
    ) {}
}