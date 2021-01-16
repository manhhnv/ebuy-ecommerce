import { Action } from "src/shared/casl/action.enum";
import { AppAbility } from "src/shared/casl/casl-ability.factory";
import { Product } from "src/libs/product/src/schema/product.schema";
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