import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put} from '@nestjs/common';
import { UsersService } from "./users.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor(
        private userService : UsersService
    ) {
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ description : 'Get user', status: 200 })
    async getUser(@Param('id') id){
        return await this.userService.findOneById(id)
    };

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({description: 'Get all users', status: 200})
    async getAllUsers(){
        return await this.userService.findAll()
    };

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({description: 'Delete user', status: 200})
    async removeUser(@Param('id') id){
        return await this.userService.removeUser(id)
    };

    @Put(':id') 
    @HttpCode(HttpStatus.OK)
    @ApiResponse({description: 'Update data user', status:200})
    async updateUser(@Param('id') id, @Body() values){
        return await this.userService.updateUser(id, values)
    };
}
