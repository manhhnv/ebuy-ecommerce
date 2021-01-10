import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/utils/validation';
import { editFileName } from 'src/utils/validation';

@Controller('product')
export class ProductController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    uploadFile(@UploadedFile() file) {
        console.log(file)
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
}