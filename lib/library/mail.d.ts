export default class Mail {
    protected to: string;
    protected from: string;
    protected sender: string;
    protected reply_to: string;
    protected subject: string;
    protected bcc: string;
    protected text: string;
    protected html: string;
    protected mailService: string;
    protected mailUser: string;
    protected mailPassword: string;
    constructor();
    setTo(to: any): void;
    setFrom(from: any): void;
    setBcc(bcc: any): void;
    setSender(sender: any): void;
    setReplyTo(reply_to: any): void;
    setSubject(subject: any): void;
    setText(text: any): void;
    setHtml(html: any): void;
    send(): void;
}
