export class Email {
  public from: string;
  public to: string;
  public subject?: string;
  public html?: string;
  public text?: string;

  constructor(init: {
    from: string;
    to: string;
    subject?: string;
    html?: string;
    text?: string;
  }) {
    this.from = init.from;
    this.to = init.to;
    this.subject = init.subject;
    this.html = init.html;
    this.text = init.text;
  }
}
