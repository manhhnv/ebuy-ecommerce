import { Action } from "../../../shared/casl/action.enum";
import { AppAbility } from "../../../shared/casl/casl-ability.factory";
import { Product } from "../../../libs/product/src/schema/product.schema";
import { IPolicyHandler } from "../policy.config";

export class ProductPolicy implements IPolicyHandler {

    private permission: Action;

    constructor(_permission: Action) {
        this.permission = _permission
    }

    handle(ability: AppAbility): boolean {
        return ability.can(this.permission, Product)
    }
    
}