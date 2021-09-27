"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, nodemailer_1.createTransport)({
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
            const promise = new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(info.response);
                    console.log('Message sent: ' + info.response);
                });
            });
            let result = '';
            result = yield promise;
            this.bcc = '';
            this.cc = '';
            this.reply_to = '';
            this.from = '';
            this.to = '';
            this.text = '';
            this.sender = '';
            this.subject = '';
            this.html = '';
            return result;
        });
    }
}
exports.default = Mail;
//# sourceMappingURL=mail.js.map