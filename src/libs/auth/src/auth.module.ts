import { Module, Global } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './service/local.strategy';
import { LocalAuthGuard } from './service/local-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserAuth } from './hook/useAuth';
import { jwtConstants } from '../constants';
import { JwtStrategy } from './service/jwt.strategy';
import { JwtAuthGuard } from './service/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema, Token } from './schema/token.schema';
import { TokenAuthGuard } from './guard/token-auth.guard';
@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Token.name, schema: TokenSchema}
        ]),
        PassportModule.register({
            session: true
        }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "30days"},
        }),
    ],
    providers: [
        AuthService, LocalStrategy,
        LocalAuthGuard, UserAuth, JwtStrategy,
        JwtAuthGuard, TokenAuthGuard
    ],
    exports: [
        AuthService, LocalStrategy,
        LocalAuthGuard, JwtAuthGuard,
        UserAuth, JwtStrategy, TokenAuthGuard] 
})
export class AuthModule {}