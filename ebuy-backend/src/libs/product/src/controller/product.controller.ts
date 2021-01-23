import {
    Controller, Get, Post,
    UseInterceptors, UploadedFile,
    Req, Param, Res, UseGuards, Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from '../../../../utils/validation';
import { editFileName } from '../../../../utils/validation';
import { Request } from 'express';
import { ProductVariantService } from '../service/product-variant.service';
import { PoliciesGuard } from '../../../../shared/policy/policies.guard';
import { CheckPolicies } from '../../../../shared/policy/policy.decorator';
import { ProductPolicy } from '../../../../shared/policy/permission/product.policy';
import { Action } from '../../../../shared/casl/action.enum';
import { ProductVariantInput, ProductVariantUpdate } from '../doc/product-variant.doc';
import {
    ApiBearerAuth, ApiConsumes, ApiBody,
    ApiTags, ApiResponse
} from '@nestjs/swagger';
@ApiTags('Product variant')
@Controller('product')
export class ProductController {
    constructor(private variantService: ProductVariantService) { }

    @Get('preview/:imgpath')
    productPreview(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads/image/variant' })
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ProductPolicy(Action.Manage))
    @Post('addProductVariant')
    @ApiResponse({
        description: "Return instance product variant",
        status: 200
    })
    @ApiConsumes('multipart/form-data', 'application/json')
    @ApiBody({ type: ProductVariantInput })
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('preview', {
        storage: diskStorage({
            destination: './uploads/image/variant',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async addProductVariant(@UploadedFile() file, @Body() body?: ProductVariantInput) {
        const previewURL = `${process.env.HOST}:${process.env.PORT}/product/preview/${file.filename}`;
        const {
            productId, inStock,
            sku, name, price,
            active, color,
            width, height, weight
        } = body
        return this.variantService.addProductVariant(
            productId, inStock,
            sku, name, price,
            active, color,
            width, height, weight, previewURL)
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ProductPolicy(Action.Manage))
    @Post('updateProductVariant')
    @ApiResponse({
        description: "Return instance product variant",
        status: 200
    })
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data", "application/json")
    @ApiBody({type: ProductVariantUpdate})
    @UseInterceptors(FileInterceptor("preview", {
        storage: diskStorage({
            destination: './uploads/image/variant',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter
    }))
    async updateProductVariant(@UploadedFile() file, @Body() body: ProductVariantUpdate) {
        const {
            variantId, inStock,
            sku, name, price,
            active, color,
            width, height, weight
        } = body

        if (file) {
            const preview = `${process.env.HOST}:${process.env.PORT}/product/preview/${file.filename}`;
            return this.variantService.updateProductVariant(
                variantId, inStock,
                sku, name, price,
                active, color,
                width, height, weight, preview
            )
        }
        return this.variantService.updateProductVariant(
            variantId, inStock,
            sku, name, price,
            active, color,
            width, height, weight
        )
    }
}