export class PaginaObjetivo {
  constructor(
    _id?: string,
    target_date_in?: Date,
    target_link?: string,
    target_desc?: string
  ) {
    this._id = _id;
    this.target_date_in = target_date_in;
    this.target_link = target_link;
    this.target_desc = target_desc;
  }

  public _id: string;
  public target_date_in: Date;
  public target_link: string;
  public target_desc: string;
}
