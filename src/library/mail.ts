import { createTransport } from 'nodemailer'
import { config } from '../common'
export default class Mail {
  protected to: string
  protected from: string
  protected sender: string
  protected reply_to: string
  protected subject: string
  protected bcc: string
  protected cc: string
  protected text: string
  protected html: string

  protected mailService: string
  protected mailUser: string
  protected mailPassword: string

  constructor() {
    this.mailService = config.mail.service
    this.mailUser = config.mail.user
    this.mailPassword = config.mail.password
  }

  public setTo(to) {
    this.to = to
  }

  public setFrom(from) {
    this.from = from
  }

  public setBcc(bcc) {
    this.bcc = bcc
  }

  public setCC(cc) {
    this.cc = cc
  }

  public setSender(sender) {
    this.sender = sender
  }

  public setReplyTo(reply_to) {
    this.reply_to = reply_to
  }

  public setSubject(subject) {
    this.subject = subject
  }

  public setText(text) {
    this.text = text
  }

  public setHtml(html) {
    this.html = html
  }

  public async send(auth = {}): Promise<string> {
    const transporter = createTransport({
      service: this.mailService,
      auth: {
        user: this.mailUser,
        pass: this.mailPassword,
        ...auth,
      },
    })

    const mailOptions: any = {
      from: this.from,
      to: this.to,
      bcc: this.bcc,
      cc: this.cc,
      subject: this.subject,
      text: this.text,
      html: this.html,
    }

    if (this.reply_to) {
      mailOptions.replyTo = this.reply_to
    }

    const promise = new Promise<string>((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error)
          return
        }
        resolve(info.response)
        console.log('Message sent: ' + info.response)
      })
    })

    let result = ''

    result = await promise
    
    this.bcc = ''
    this.cc = ''
    this.reply_to = ''
    this.from = ''
    this.to = ''
    this.text = ''
    this.sender = ''
    this.subject = ''
    this.html = ''

    return result
  }
}
