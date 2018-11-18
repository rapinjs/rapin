"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const rapin_config_1 = require("rapin-config");
class Mail {
    constructor() {
        this.mailService = rapin_config_1.mail.service;
        this.mailUser = rapin_config_1.mail.user;
        this.mailPassword = rapin_config_1.mail.password;
    }
    setTo(to) {
        this.to = to;
    }
    setFrom(from) {
        this.from = from;
    }
    setBcc(bcc) {
        this.bcc = bcc;
    }
    setSender(sender) {
        this.sender = sender;
    }
    setReplyTo(reply_to) {
        this.reply_to = reply_to;
    }
    setSubject(subject) {
        this.subject = subject;
    }
    setText(text) {
        this.text = text;
    }
    setHtml(html) {
        this.html = html;
    }
    send() {
        const transporter = nodemailer_1.createTransport({
            service: this.mailService,
            auth: {
                user: this.mailUser,
                pass: this.mailPassword,
            },
        });
        const mailOptions = {
            from: this.from,
            to: this.to,
            bcc: this.bcc,
            subject: this.subject,
            text: this.text,
            html: this.html,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        this.bcc = '';
    }
}
exports.default = Mail;
//# sourceMappingURL=mail.js.map