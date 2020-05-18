export class Comentarios {
  constructor(
    _id?: string,
    id_reply?: string,
    comment_date?: Date,
    comment_text?: string,
    comment_user?: string,
    comment_user_link?: string,
    comment_post_link?: string,
    type?: string,
    comment_report?: string,
    potable?: number
  ) {
    this._id = _id;
    this.id_reply = id_reply;
    this.comment_date = comment_date;
    this.comment_text = comment_text;
    this.comment_user = comment_user;
    this.comment_user_link = comment_user_link;
    this.comment_post_link = comment_post_link;
    this.type = type;
    this.comment_report = comment_report;
    this.potable = potable;
  }

  public _id: string;
  public id_reply: string;
  public comment_date: Date;
  public comment_text: string;
  public comment_user: string;
  public comment_user_link: string;
  public comment_post_link: string;
  public type: string;
  public comment_report: string;
  public potable: number;
}
