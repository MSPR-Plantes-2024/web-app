import { User } from './user';

export class Address {
  id?: number;
  user: User;
  postalAddress: string;
  city: string;
  zipCode: string;
  otherInformations?: string;

  constructor(user: User, postalAddress: string, city: string, zipCode: string, otherInformations?: string, id?: number) {
    this.id = id;
    this.user = user;
    this.postalAddress = postalAddress;
    this.city = city;
    this.zipCode = zipCode;
    this.otherInformations = otherInformations;
  }

  public toJson(): Map<string, any> {
    if (!this.user?.id) {
      throw new Error('User must be defined');
    }
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['user', this.user.id.toString()],
        ['postalAddress', this.postalAddress],
        ['city', this.city],
        ['zipCode', this.zipCode],
        ['otherInformations', this.otherInformations ?? '']
      ]
    );
  }

  public static fromJson(json: Map<string, any>): Address {
    if (!json.get('user')) {
      throw new Error('User must be defined');
    }
    return new Address(
      User.fromJson(json.get('user')),
      json.get('postalAddress'),
      json.get('city'),
      json.get('zipCode'),
      json.get('otherInformations') ?? null,
      json.get('id')
    );
  }
}
