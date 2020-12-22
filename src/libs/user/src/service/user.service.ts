import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserInput, RegisterUserAccountResult, ErrorCode } from '../../../../generate-types';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    )
    {}
    async createUserAccount(input: CreateUserInput): Promise<RegisterUserAccountResult> {
        try {
            let userAccount = new this.userModel(input)
            userAccount = await userAccount.save()
            return {
                success: true
            }
        }
        catch(e) {
            let exisstUser = await this.userModel.findOne({email: input.email})
            if (exisstUser != null) {
                return {
                    errorCode: ErrorCode.EmailAddressConflictError,
                    message: 'Email is unique field'
                }
            }
            exisstUser = await this.userModel.findOne({username: input.username})
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
}