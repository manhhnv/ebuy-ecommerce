import {
    Resolver, ResolveField, Mutation,
    Query, Args, Context, Parent, 
} from '@nestjs/graphql';
import { CollectionService } from '../service/collection.service';
import { SubCollection } from '../schema/sub-collection.schema';
import { ListCollection } from 'src/generate-types';
import { Collection } from '../schema/collection.schema';

@Resolver('Collection')
export class CollectionResolver {
    constructor (private collectionService: CollectionService)
    {}

    @Query()
    getCollections() {
        return this.collectionService.getCollections()
    }

    @Mutation()
    createCollection(
        @Args('name') name: string,
        @Args('active') active: boolean,
        @Args('subCollections') subCollections: string[]) {
            return this.collectionService.createCollection(name, active, subCollections)
    }

    @ResolveField('subCollections', returns => [SubCollection])
    subCollections (@Parent() collection: Collection) {
        const {_id} = collection
        return this.collectionService.subCollections(_id)
    }
}