import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/generate-types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    // async validate(input: LoginInput): Promise<any> {
    //     const result = await this.authService.validateUser(input)
    //     if (result.__typename == "UserWithToken") {
    //         return result
    //     }
    //     else {
    //         throw new UnauthorizedException();
    //     }
    // }
}