import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UsersService } from "../users/users.service";
import { TokenService} from "../token/token.service";
import { MailService } from "../mail/mail.service";
import { User } from "../users/users.entity";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService
    ) {}

    async validateUser(email: string, pass: string){
        const user = await this.userService.findOneByEmail(email);
        if(!user) {
            return null
        }

        const match = await this.comparePassword(pass, user.password);
        if(!match){
            return null
        }

        const { password, ...result } = user['dataValues'];
        return result
    };

    public async login(user, header){
        const authUser: User = await this.validateUser(user.email, user.password);
        if(authUser) {
            const resultValidateToken = await this.tokenService.validateToken(authUser, header.authorization);
            return { authUser, accessToken: resultValidateToken }
        }
    };

    public async create(user){
        try{
            const { newUser, result } = await this.dataUserGenerate(user)
            const token = await this.tokenService.generateToken(newUser);
            const dataActivation = await this.dataMailGenerate(newUser)
            const { accessToken, refreshToken } = token;
            await this.tokenService.saveToken(newUser.id, refreshToken);
            return { User: result, accessToken, status: dataActivation };
        }catch (e) {
            console.log(e)
            return { message: 'User not created'}
        }
    };

    private async hashPassword(password){
        return await bcrypt.hash(password, 10);
    }

    private async comparePassword(enteredPassword, dbPassword): Promise<boolean>{
        return await bcrypt.compare(enteredPassword, dbPassword);
    };

    private async dataUserGenerate(user){
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.create({...user, password: pass});
        const {password, ...result} = newUser["dataValues"];
        return { newUser, result }
    };

    private async dataMailGenerate(user){
        const activationLink = randomUUID();
        await this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/activate/${activationLink}`);
        return await this.mailService.saveStatusActivate(user.id, activationLink)
    };
}
