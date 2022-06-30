import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailProviders } from "./mail.providers";

@Module({
  providers: [MailService,...MailProviders],
  exports : [MailService, MailModule],
  controllers: [MailController]
})
export class MailModule {}
