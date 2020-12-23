import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    LoginInput, NativeAuthenticationResult, ErrorCode,
    CreateUserInput, RegisterUserAccountResult, User
} from 'src/generate-types';
import { UserAuth } from '../hook/useAuth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private useAuth: UserAuth,
        private jwtService: JwtService
        ) {}
    

    private generateToken(user: User | any): string {
        const payload = { _id: user._id, email: user.email }
        return this.jwtService.sign(payload)
    }
    async validateUser(input: LoginInput, user: any): Promise<NativeAuthenticationResult> {

        const passwordValidate = await this.useAuth.valiatePassword(input.password, user!.password)
        if (passwordValidate == false) {
            return {
                errorCode: ErrorCode.NativeAuthStrategyError,
                message: 'Email or password is wrong'
            }
        }
        else {
            const accessToken = this.generateToken(user)
            return {
                user: user,
                token: accessToken
            }
        }
    }

    async createUser(input: CreateUserInput): Promise<CreateUserInput> {
        try {
            const hashPassword = await this.useAuth.hashPassword(input.password)
            input.password = hashPassword
            return input
        }
        catch(e) {
            throw new InternalServerErrorException(e?.message || 'Can not connect to server')
        }
    }
}