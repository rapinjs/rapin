"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const common_1 = require("../common");
class Mail {
    constructor() {
        this.mailService = common_1.config.mail.service;
        this.mailUser = common_1.config.mail.user;
        this.mailPassword = common_1.config.mail.password;
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
    setCC(cc) {
        this.cc = cc;
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
    send(auth = {}) {
        const transporter = nodemailer_1.createTransport({
            service: this.mailService,
            auth: Object.assign({ user: this.mailUser, pass: this.mailPassword }, auth),
        });
        const mailOptions = {
            from: this.from,
            to: this.to,
            bcc: this.bcc,
            cc: this.cc,
            subject: this.subject,
            text: this.text,
            html: this.html,
        };
        if (this.reply_to) {
            mailOptions.replyTo = this.reply_to;
        }
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