import {Address} from "./address";
import {User} from "./user";
import {Plant} from "./plant";
import {Report} from "./report";

export class Publication {
  id?: number;
  creationDate: Date;
  dateTimeBegin: Date;
  dateTimeEnd: Date;
  address: Address;
  publisher: User;
  gardenkeeper?: User;
  description: string;
  plants: Array<Plant>;
  Report: Array<Report>;

  constructor(creationDate: Date, dateTimeBegin: Date, dateTimeEnd: Date, address: Address, publisher: User, description: string, plants: Array<Plant>, Report: Array<Report>, gardenkeeper?: User, id?: number) {
    this.id = id;
    this.creationDate = creationDate;
    this.dateTimeBegin = dateTimeBegin;
    this.dateTimeEnd = dateTimeEnd;
    this.address = address;
    this.publisher = publisher;
    this.gardenkeeper = gardenkeeper;
    this.description = description;
    this.plants = plants;
    this.Report = Report;
  }
}
