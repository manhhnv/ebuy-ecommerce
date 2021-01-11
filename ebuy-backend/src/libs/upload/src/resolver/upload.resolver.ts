import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { GraphQLUpload } from "apollo-server-express";
@Resolver()
export class UploadResolver {

    @Mutation(() => Boolean)
    async uploadFile(@Args({name: "file", type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }): Promise<boolean> {
        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(`./uploads/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }

}