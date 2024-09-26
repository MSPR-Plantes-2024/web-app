export class JdkToken {
  token: string;
  refreshToken: string;
  expirationDateTime: Date;

  constructor(token: string, refreshToken: string, expirationDateTime: Date) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expirationDateTime = expirationDateTime;
  }

  static fromJson(json: Map<string, any>): JdkToken {
    return new JdkToken(
      json.get('token'),
      json.get('refreshToken'),
      new Date(
        JSON.parse(
          atob(json.get('token')
            .split('.')[1])).exp * 1000));
  }
}
