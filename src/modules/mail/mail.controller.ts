import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { MailService } from "./mail.service";

@Controller('activate')
@ApiTags('MailService')
export class MailController {
    constructor(
        private mailService: MailService
    ) {

    }

    @Get(':link')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({description: 'mail activated rout', status: 200})
    async mailActivate(@Param('link') link) {
        return await this.mailService.activate(link)
    }
}
