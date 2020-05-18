export class Cantidades {
  constructor(
    total?: number,
    postCount?: number,
    replyCount?: number,
    potCount?: number
  ) {
    this.total = total;
    this.postCount = postCount;
    this.replyCount = replyCount;
    this.potCount = potCount;
  }

  public total: number;
  public postCount: number;
  public replyCount: number;
  public potCount: number;
}
