import { Action } from '../../casl/action.enum';
import { AppAbility } from '../../casl/casl-ability.factory';
import { IPolicyHandler } from '../policy.config';
import { Order } from '../../../libs/user/src/schema/order.schema';

export class OrderPolicy implements IPolicyHandler {

    private permission: Action;
    private target: Order

    constructor(_permission: Action) {
        this.permission = _permission;
    }

    handle(ability: AppAbility): boolean {
        return ability.can(this.permission, Order)
    }
    
}