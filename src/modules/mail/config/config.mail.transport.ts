import SMTPTransport from "nodemailer/lib/smtp-transport";

export const TRANSPORT: SMTPTransport.Options = {
    host : process.env.SMTP_HOST,
    port : Number(process.env.SMTP_PORT),
    secure: true,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASSWORD
    }
};