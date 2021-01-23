import { AppAbility } from '../../../shared/casl/casl-ability.factory';
import { IPolicyHandler } from '../policy.config';
import { Slider } from '../../../libs/slider/src/schema/slider.schema';
import { Action } from '../../../shared/casl/action.enum';

export class SliderPolicy implements IPolicyHandler {

    private permission: Action

    constructor(_permission: Action) {
        this.permission = _permission
    }

    handle(ability: AppAbility): boolean {
        return ability.can(this.permission, Slider)
    }
    
}