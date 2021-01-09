import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection, CollectionDocument } from '../schema/collection.schema';
import { SubCollection, SubCollectionDocument } from '../schema/sub-collection.schema';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
        @InjectModel(SubCollection.name) private subCollectionModel: Model<SubCollectionDocument>,
    ) {}
}