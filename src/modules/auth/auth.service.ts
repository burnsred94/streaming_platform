import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string){
        const user = await this.userService.findOneByEmail(username)
        if(!user) {
            return null
        }

        const match = await this.comparePassword(pass, username);
        if(!match){
            return null
        }

        const { password, ...result } = user['dataValues'];
        return result
    };

    public async login(user){
        const authUser = await this.validateUser(user.name, user.password)
        const token = await this.generateToken(user);
        return { authUser, token }
    }

    public async create(user){
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.create({...user, password: pass});
        const {password ,...result} = newUser["dataValues"];
        const token = await this.generateToken(result);

        return { User: result, token };
    };

    private async generateToken(user){
        return await this.jwtService.signAsync(user)
    };

    private async hashPassword(password){
        const hash = await bcrypt.hash(password, 10)
        return hash
    }

    private async comparePassword(enteredPassword, dbPassword){
        const match = await bcrypt.compare(enteredPassword, dbPassword)
        return match
    };

}
