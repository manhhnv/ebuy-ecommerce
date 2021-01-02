import { Module } from '@nestjs/common';
import { UploadResolver } from './resolver/upload.resolver';

@Module({
    providers: [UploadResolver]
})
export class UploadModule {}