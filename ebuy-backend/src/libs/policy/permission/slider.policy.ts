import { AppAbility } from 'src/libs/casl/casl-ability.factory';
import { IPolicyHandler } from '../policy.config';
import { Slider } from 'src/libs/slider/src/schema/slider.schema';
import { Action } from 'src/libs/casl/action.enum';

export class SliderPolicy implements IPolicyHandler {

    private permission: Action

    constructor(_permission: Action) {
        this.permission = _permission
    }

    handle(ability: AppAbility): boolean {
        return ability.can(this.permission, Slider)
    }
    
}