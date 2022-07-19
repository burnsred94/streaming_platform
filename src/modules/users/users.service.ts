import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from "../../core/constants";
import { User } from "./users.entity";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {

    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository : typeof User
    ) {};

    async create(dto: UserDto): Promise<User> {
        return await this.userRepository.create<User>(dto);
    };

    async findOneByEmail(email: string): Promise<User>{
        return await this.userRepository.findOne({ where: {email} });
    };

    async findOneById(id: string): Promise<User>{
        return await this.userRepository.findOne({ where: {id} });
    };

    async findAll(): Promise<User[]>{
        return await this.userRepository.findAll()
    };

    async removeUser(id: string){
        return await this.userRepository.destroy({ where: {id} })
    };

    async updateUser(id: string, values: object): Promise<User>{
        await this.userRepository.update({...values},{ where: {id}})
        return await this.findOneById(id)
    }

}
