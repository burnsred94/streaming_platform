import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { TokenModule } from "../token/token.module";
import { MailModule } from "../mail/mail.module";


@Module({
  providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy
  ],
  controllers: [AuthController],
  imports: [
      PassportModule,
      UsersModule,
      JwtModule.register({
          secret: process.env.JWTKEY,
          signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
      }),
      TokenModule,
      MailModule,
  ]
})
export class AuthModule {}
