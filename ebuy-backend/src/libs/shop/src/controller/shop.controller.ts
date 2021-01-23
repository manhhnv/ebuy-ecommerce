import {
    Controller, Body, UploadedFile,
    UseInterceptors, UseGuards, Param,
    Res, Get, Post, UploadedFiles, Req,
} from '@nestjs/common';
import {
    ApiBearerAuth, ApiConsumes, ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiParam } from '@nestjs/swagger';
import { CheckPolicies } from '../../../../shared/policy/policy.decorator';
import { ShopPolicy } from '../../../../shared/policy';
import { Action } from '../../../../shared/casl/action.enum';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../../../utils/validation';
import { Request } from 'express';
import { PoliciesGuard } from '../../../../shared/policy/policies.guard';
import { ShopCreate } from '../doc/shop.doc';
import { ShopService } from '../service/shop.service';
@ApiTags('Shop')
@Controller('shop')

export class ShopController {

    constructor(private shopService: ShopService) {

    }

    @Get('image/:path')
    @ApiParam({ name: 'path' })
    getImage(@Param('path') image, @Res() res) {
      return res.sendFile(image, {root: './uploads/asset/public/shop'})
    }
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ShopPolicy(Action.Manage))
    @Post('create')
    @ApiConsumes('multipart/data', 'application/json')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1},
        {name: 'banner', maxCount: 1 }
    ], {
        storage: diskStorage({
            destination: './uploads/asset/public/shop',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    createShop(@UploadedFiles() files, @Req() req: Request, @Body() body: ShopCreate) {
        const authorization = req.headers.authorization;
        let avatar = null;
        let banner = null;
        if (files.avatar) {
            avatar = `${process.env.HOST}:${process.env.PORT}/shop/image/${files.avatar[0].filename}`;
        }
        if (files.banner) {
            banner = `${process.env.HOST}:${process.env.PORT}/shop/image/${files.banner[0].filename}`;
        }
        console.log("BODY", body)
        const {
            brandName, phoneNumbers, shopEmails,
            province, state, streetLine1, streetLine2,
            metaDescription, metaKeyword
        } = body;
        return this.shopService.createShop(
            brandName, phoneNumbers, shopEmails, streetLine1,
            province, state, avatar, banner, authorization, streetLine2,
            metaDescription, metaKeyword
        )
    }
}