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

}
