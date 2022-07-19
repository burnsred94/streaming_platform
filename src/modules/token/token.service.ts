import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TOKEN_REPOSITORY } from "../../core/constants";
import { Token } from "./token.entity";




@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(TOKEN_REPOSITORY) private readonly tokenRepository: typeof Token
    ) {}

    async generateToken (payload) {
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '30m' });
        const refreshToken = await this.jwtService.signAsync(payload, {expiresIn: '30d'});
        return { accessToken, refreshToken }
    };

    async saveToken(userId, tokenRefresh) {
        const tokenData = await this.tokenRepository.findOne({where: {userId}});
        if (tokenData) {
            tokenData.refreshToken = tokenRefresh
            return tokenData.save()
        }
        return await this.tokenRepository.create({userId, refreshToken: tokenRefresh })
    };

    async validateToken(authUser, accessToken): Promise<string>{
        try {
            const userTokenRefresh = await this.tokenRepository.findOne({where: { userId : authUser.id}});
            if(userTokenRefresh){
                const resultRefresh = await this.jwtService.verify(userTokenRefresh.refreshToken);
                if(!accessToken){
                   return await this.tokenRenewal(authUser)
                }
                const resultAccess = await this.jwtService.verify(accessToken, { secret: process.env.JWTKEY})
                const resultComparison = await this.comparisonOfTokens(authUser, resultRefresh, resultAccess)
                if(resultComparison){
                    return accessToken
                }
            }
        }catch (e) {
            if(e.message === 'jwt expired'){
                return this.tokenRenewal(authUser)
            }
        }
    };

    private async comparisonOfTokens(authUser ,refresh, access){
        try {
            if(refresh.id !== access.id || refresh.email !== access.email){
               throw new Error('Token invalid')
            }else {
               const { refreshToken } = await this.generateToken(authUser);
                await this.saveToken(authUser.id, refreshToken)
                return true
            }
        }catch (e) {
            console.log(e)
        }
    }

    private async tokenRenewal(user){
        const tokens = await this.generateToken(user)
        const { accessToken, refreshToken } = tokens
        await this.saveToken(user.id, refreshToken)
        return accessToken
    };
}