import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile,
    Req, Param, Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/utils/validation';
import { editFileName } from 'src/utils/validation';
import { Request } from 'express';

@Controller('product')
export class ProductController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/image/variant',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadFile(@UploadedFile() file, @Req() request: Request) {
        // console.log(request.body)
        // console.log(file)
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    @Get('preview/:imgpath')
    productPreview(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, {root: './uploads/image/variant'})
    }
}