export declare class Mail {
  setTo(to: string): void
  setFrom(from: string): void
  setBcc(bcc: string): void
  setSender(sender: string): void
  setReplyTo(reply_to: string): void
  setSubject(subject: string): void
  setText(text: string): void
  setHtml(html: string): void
  send(auth?: {user: string; pass: string; }): void
}