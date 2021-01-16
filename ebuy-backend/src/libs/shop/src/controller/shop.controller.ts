import {
    Controller, Body, UploadedFile,
    UseInterceptors, UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PoliciesGuard } from 'src/shared/policy/policies.guard';
import {  } from 'src/shared/policy'

@ApiTags('Shop')
@Controller()

export class ShopController {

}