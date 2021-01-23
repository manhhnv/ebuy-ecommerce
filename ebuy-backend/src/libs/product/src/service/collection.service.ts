import {
    Injectable, InternalServerErrorException,
    HttpException, HttpStatus
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, CollectionDocument } from '../schema/collection.schema';
import { SubCollection, SubCollectionDocument } from '../schema/sub-collection.schema';
import { Model } from 'mongoose';
import { ListCollection } from '../../../../generate-types';
import { Types } from 'mongoose';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
        @InjectModel(SubCollection.name) private subCollectionModel: Model<SubCollectionDocument>
    ) {}

    async getCollections(): Promise<ListCollection> {
        try {
            const collections = await this.collectionModel.find()
            return {
                collections: collections,
                totalCollections: collections.length
            }
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async addSubCollection(collectionId: string, name: string, active: boolean): Promise<ListCollection> {
        try {
            const subCollection = new this.subCollectionModel({
                name: name,
                collect: Types.ObjectId(collectionId),
                active: active
            })
            await subCollection.save()
            return this.getCollections()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    async createCollection(name: string, active: boolean, subCollections?: string[]): Promise<ListCollection> {
        try {
            const collection = new this.collectionModel({
                name: name,
                totalSubCollection: subCollections?.length || 0,
                active: active,
            })
            await collection.save()
            if (subCollections && subCollections.length > 0) {
                await subCollections.map(name => {
                    return this.addSubCollection(collection.id, name, true)
                })
            }
            return this.getCollections()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }

    async removeCollection(id: string): Promise<ListCollection> {
        try {
            await this.collectionModel.remove({
                _id: Types.ObjectId(id)
            })
            await this.subCollectionModel.remove({
                collect: Types.ObjectId(id)
            })
            return this.getCollections()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }

    async updateCollection(id: string, name: string, active: boolean): Promise<ListCollection> {
        try {
            const collection = await this.collectionModel.findById(Types.ObjectId(id))
            if (!collection) {
                throw new HttpException('Collection not found', HttpStatus.BAD_REQUEST)
            }
            else {
                await collection.update({
                    name: name,
                    active: active,
                    updatedAt: new Date()
                })
            }
            return this.getCollections()
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
    
    async subCollections(collectionId: Types.ObjectId) {
        try {
            const subs = await this.subCollectionModel.find({
                collect: collectionId
            })
            return subs
        }
        catch(e) {
            throw new InternalServerErrorException(e.message || 'An error occurred while processing request')
        }
    }
}