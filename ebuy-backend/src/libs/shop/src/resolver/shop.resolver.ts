import { ResolveField, Resolver, Query, Args } from '@nestjs/graphql';
import { ShopService } from '../service/shop.service';

@Resolver('ShopInfo')
export class ShopResolver {
    constructor(private shopService: ShopService) {

    }

    @Query()
    getShopInfo(@Args('_id') _id: string) {
        return this.shopService.getShopDetail(_id)
    }
}
