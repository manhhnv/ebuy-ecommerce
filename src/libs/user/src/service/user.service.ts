import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import {
    CreateUserInput,
    RegisterUserAccountResult,
    ErrorCode,
    LoginInput,
    NativeAuthenticationResult
} from 'src/generate-types';
import { AuthService } from 'src/libs/auth/src/service/auth.service';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authService: AuthService
    ) { }
    async createUserAccount(input: CreateUserInput): Promise<RegisterUserAccountResult> {
        try {
            const proccessedInput = await this.authService.createUser(input)
            if (proccessedInput) {
                let userAccount = new this.userModel(proccessedInput)
                userAccount = await userAccount.save()
                return {
                    success: true
                }
            }
        }
        catch (e) {
            let exisstUser = await this.userModel.findOne({ email: input.email })
            if (exisstUser != null) {
                return {
                    errorCode: ErrorCode.EmailAddressConflictError,
                    message: 'Email is unique field'
                }
            }
            exisstUser = await this.userModel.findOne({ username: input.username })
            if (exisstUser != null) {
                return {
                    errorCode: ErrorCode.UsernameConflictError,
                    message: 'Username is unique field'
                }
            }
            return {
                errorCode: ErrorCode.NotMatchRegex,
                message: e?.message || 'Please check formar fields input'
            }
        }
    }
    async login(input: LoginInput): Promise<NativeAuthenticationResult> {
        try {
            const user = await this.userModel.findOne({ email: input.email })
            if (user) {
                return this.authService.validateUser(input, user)
            }
            else {
                return {
                    errorCode: ErrorCode.NativeAuthStrategyError,
                    message: 'Not found user'
                }
            }
        }
        catch (e) {
            return {
                errorCode: ErrorCode.NativeAuthStrategyError,
                message: 'Not found user'
            }
        }
    }
}