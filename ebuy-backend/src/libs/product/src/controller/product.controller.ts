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
import { ProductVariantService } from '../service/product-variant.service';
@Controller('product')
export class ProductController {
    constructor(private variantService: ProductVariantService) {}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/image/variant',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async uploadProductImage(@UploadedFile() file, @Req() request: Request) {
        const {_id} = request.body
        console.log(file)
        const previewURL = `${process.env.HOST}:${process.env.PORT}/product/preview/${file.filename}`
        const response = await this.variantService.uploadVariantImage(_id, previewURL)
        return response
    }
    @Get('preview/:imgpath')
    productPreview(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, {root: './uploads/image/variant'})
    }
}