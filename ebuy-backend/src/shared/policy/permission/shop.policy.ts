import { Shop } from 'src/libs/shop/src/schema/shop.schema';
import { Action } from 'src/shared/casl/action.enum';
import { AppAbility } from 'src/shared/casl/casl-ability.factory';
import { IPolicyHandler } from '../policy.config';

export class ShopPolicy implements IPolicyHandler {

    private permission: Action;
    constructor(_permission: Action) {
        this.permission = _permission;
    }

    handle(ability: AppAbility): boolean {
        return ability.can(this.permission, Shop)
    }

}