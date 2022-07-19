import { Module } from '@nestjs/common';
import { TokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt";
import { TokenProviders } from "./token.providers";

@Module({
    providers: [TokenService, ...TokenProviders],
    imports: [
        JwtModule.register({
            secret : process.env.JWTKEY,
        })

    ],
    exports: [
        TokenModule,
        TokenService
    ],

})
export class TokenModule {}
