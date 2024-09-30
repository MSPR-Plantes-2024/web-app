export class User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;

  constructor(firstName: string, lastName: string, email: string, password: string, userType: string, id?: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }

  toJson(): Map<string, any> {
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['firstName', this.firstName],
        ['lastName', this.lastName],
        ['email', this.email],
        ['password', this.password],
        ['userType', this.userType]
      ]
    );
  }

  static fromJson(json: Map<string, any>): User {
    return new User(
      json.get('firstName'),
      json.get('lastName'),
      json.get('email'),
      json.get('password'),
      json.get('userType'),
      json.get('id')
    );
  }
}
