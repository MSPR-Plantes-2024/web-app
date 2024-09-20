export class JdkToken {
  token: string;
  refreshToken: string;
  expirationDateTime: Date;

  constructor(token: string, refreshToken: string, expirationDateTime: Date) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expirationDateTime = expirationDateTime;
  }
}
