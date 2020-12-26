import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './service/local.strategy';
import { LocalAuthGuard } from './service/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserAuth } from './hook/useAuth';
import { jwtConstants } from '../constants';
import { JwtStrategy } from './service/jwt.strategy';
import { JwtAuthGuard } from './service/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema, Token } from './schema/token.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Token.name, schema: TokenSchema}
        ]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 2592000}
        })
    ],
    providers: [
        AuthService, LocalStrategy,
        LocalAuthGuard, UserAuth, JwtStrategy,
        JwtAuthGuard
    ],
    exports: [
        AuthService, LocalStrategy,
        LocalAuthGuard, JwtAuthGuard,
        UserAuth, JwtStrategy] 
})
export class AuthModule {}