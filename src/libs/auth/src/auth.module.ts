import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './service/local.strategy';
import { LocalAuthGuard } from './service/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserAuth } from './hook/useAuth';
import { jwtConstants } from '../constants';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 2592000}
        })
    ],
    providers: [
        AuthService, LocalStrategy,
        LocalAuthGuard, UserAuth
    ],
    exports: [
        AuthService, LocalStrategy,
        LocalAuthGuard,
        UserAuth] 
})
export class AuthModule {}