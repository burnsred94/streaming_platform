import {Inject, Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { Mail } from "./mail.entity";
import { TRANSPORT } from "./config/config.mail.transport";
import { MAIL_REPOSITORY } from "../../core/constants";


@Injectable()
export class MailService {
        transporter : nodemailer.Transporter
    constructor(
        @Inject(MAIL_REPOSITORY) private readonly mailRepository: typeof Mail
    ) {
        this.transporter = nodemailer.createTransport(TRANSPORT)
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from : process.env.SMTP_USER,
            to,
            subject: 'Activate account' + process.env.API_URL,
            text: '',
            html:
                `<div>
                    <h1>To activate follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>`
        })
    }

    async saveStatusActivate(id, link){
           return await this.mailRepository.create( {userId : id, urlActivate: link})
    }

    async activate(link){
           return  await this.mailRepository.update({isActivate: true}, { where:{ urlActivate: link} })
    }
}
