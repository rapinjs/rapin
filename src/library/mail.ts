import {createTransport} from 'nodemailer'
import {mail} from 'rapin-config'
export default class Mail {
  protected to: string
  protected from: string
  protected sender: string
  protected reply_to: string
  protected subject: string
  protected bcc: string
  protected text: string
  protected html: string

  protected mailService: string
  protected mailUser: string
  protected mailPassword: string

  constructor() {
    this.mailService = mail.service
    this.mailUser = mail.user
    this.mailPassword = mail.password
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

  public send() {
    const transporter = createTransport({
      service: this.mailService,
      auth: {
        user: this.mailUser,
        pass: this.mailPassword,
      },
    })

    const mailOptions = {
      from: this.from,
      to: this.to,
      bcc: this.bcc,
      subject: this.subject,
      text: this.text,
      html: this.html,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: ' + info.response)
    })
    this.bcc = ''
  }
}
