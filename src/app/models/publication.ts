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
  reports: Array<Report>;

  constructor({ creationDate, dateTimeBegin, dateTimeEnd, address, publisher, description, plants, reports, gardenkeeper, id }: 
    { creationDate: Date, dateTimeBegin: Date, dateTimeEnd: Date, address: Address, publisher: User, description: string, plants: Array<Plant>, reports: Array<Report>, gardenkeeper?: User, id?: number }) {
    this.id = id;
    this.creationDate = creationDate;
    this.dateTimeBegin = dateTimeBegin;
    this.dateTimeEnd = dateTimeEnd;
    this.address = address;
    this.publisher = publisher;
    this.gardenkeeper = gardenkeeper;
    this.description = description;
    this.plants = plants;
    this.reports = reports;
  }

  toJson(): Map<string, any> {
    if (!this.address?.id) {
      throw new Error('Address must be defined');
    }
    if (!this.publisher?.id) {
      throw new Error('Publisher must be defined');
    }
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['creationDate', this.creationDate.toISOString()],
        ['dateTimeBegin', this.dateTimeBegin.toISOString()],
        ['dateTimeEnd', this.dateTimeEnd.toISOString()],
        ['address', this.address.id.toString()],
        ['publisher', this.publisher.id.toString()],
        ['gardenkeeper', this.gardenkeeper?.id?.toString() ?? ''],
        ['description', this.description],
        ['plants', JSON.stringify(this.plants.map(plant => plant.toJson()))],
        ['reports', JSON.stringify(this.reports.map(report => report.toJson()))]
      ]
    );
  }

  static fromJson(json: Map<string, any>): Publication {
    if (!json.get('address')) {
      throw new Error('Address must be defined');
    }
    if (!json.get('publisher')) {
      throw new Error('Publisher must be defined');
    }
    return new Publication(
      {
        creationDate: new Date(json.get('creationDate')),
        dateTimeBegin: new Date(json.get('dateTimeBegin')),
        dateTimeEnd: new Date(json.get('dateTimeEnd')),
        address: Address.fromJson(json.get('address')),
        publisher: User.fromJson(json.get('publisher')),
        gardenkeeper: json.get('gardenkeeper') ? User.fromJson(json.get('gardenkeeper')) : undefined,
        description: json.get('description'),
        plants: json.get('plants') ? (json.get('plants') as Array<Map<string, any>>).map(plant => Plant.fromJson(plant)) : [],
        reports: json.get('reports') ? (json.get('reports') as Array<Map<string, any>>).map(report => Report.fromJson(report)) : [],
        id: json.get('id')
      }
    );
  }
}
