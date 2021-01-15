import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile,
    Req, Param, Res, UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from 'src/utils/validation';
import { editFileName } from 'src/utils/validation';
import { Request } from 'express';
import { ProductVariantService } from '../service/product-variant.service';
import { PoliciesGuard } from 'src/libs/policy/policies.guard';
import { CheckPolicies } from 'src/libs/policy/policy.decorator';
import { ProductPolicy } from 'src/libs/policy/permission/Product.policy';
import { Action } from 'src/libs/casl/action.enum';
@Controller('product')
export class ProductController {
    constructor(private variantService: ProductVariantService) { }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/image/variant',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async uploadProductImage(@UploadedFile() file, @Req() request: Request) {
        const { _id } = request.body
        const previewURL = `${process.env.HOST}:${process.env.PORT}/product/preview/${file.filename}`
        const response = await this.variantService.uploadVariantImage(_id, previewURL)
        return response
    }

    @Get('preview/:imgpath')
    productPreview(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads/image/variant' })
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ProductPolicy(Action.Manage))
    @Post('addProductVariant')
    @UseInterceptors(FileInterceptor('preview', {
        storage: diskStorage({
            destination: './uploads/image/variant',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async addProductVariant(@UploadedFile() file, @Req() request: Request) {
        const previewURL = `${process.env.HOST}:${process.env.PORT}/product/preview/${file.filename}`;
        const {
            productId, inStock,
            sku, name, price,
            active, color,
            width, height, weight
        } = request.body
        return this.variantService.addProductVariant(
            productId, inStock,
            sku, name, price,
            active, color,
            width, height, weight, previewURL)
    }
}