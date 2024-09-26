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

  static fromJson(json: Map<string, any>): User {
    throw new Error('Method not implemented.');
  }
}
