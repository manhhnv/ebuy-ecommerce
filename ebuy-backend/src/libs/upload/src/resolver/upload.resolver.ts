import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Upload } from '../../types';
@Resolver()
export class UploadResolver {

    constructor() {}

    @Mutation(() => Boolean)
    async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: Upload): Promise<boolean> {
        console.log(filename)
        return true
        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(__dirname + `./uploads/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }

}
// '{"query": "mutation UploadFile($file: Upload!) {\n  uploadFile(file: $file)\n}"}'