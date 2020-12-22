import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ])
    ],
    providers: [UserService, UserResolver]
})
export class UserModule {}