import { Mail } from "./mail.entity";
import { MAIL_REPOSITORY } from "../../core/constants";

export const MailProviders = [{
    provide : MAIL_REPOSITORY,
    useValue : Mail
}]