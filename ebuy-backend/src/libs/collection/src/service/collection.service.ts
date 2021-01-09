import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection, CollectionDocument } from '../schema/collection.schema';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
    ) {}
}