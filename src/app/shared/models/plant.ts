import {Address} from "./address";
import {Picture} from "./picture";
import {User} from "../../core/models/user";
import {PlantCondition} from "./plant-condition";

export class Plant {
  id?: number;
  address: Address;
  name: string;
  picture: Picture;
  description: string;
  user: User;
  plantCondition: PlantCondition;

  constructor(address: Address, name: string, picture: Picture, description: string, user: User, plantCondition: PlantCondition, id?: number) {
    this.id = id;
    this.address = address;
    this.name = name;
    this.picture = picture;
    this.description = description;
    this.user = user;
    this.plantCondition = plantCondition;
  }

  toJson(): Map<string, any> {
    if (!this.address?.id) {
      throw new Error('Address must be defined');
    }
    if (!this.user?.id) {
      throw new Error('User must be defined');
    }
    if (!this.plantCondition?.id) {
      throw new Error('Plant condition must be defined');
    }
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['address', this.address.id.toString()],
        ['name', this.name],
        ['picture', this.picture.id?.toString() ?? ''],
        ['description', this.description],
        ['user', this.user.id.toString()],
        ['plantCondition', this.plantCondition.id.toString()]
      ]
    );
  }

  static fromJson(json: Map<string, any>): Plant {
    if (!json.get('address')) {
      throw new Error('Address must be defined');
    }
    if (!json.get('user')) {
      throw new Error('User must be defined');
    }
    if (!json.get('plantCondition')) {
      throw new Error('Plant condition must be defined');
    }
    return new Plant(
      Address.fromJson(json.get('address')),
      json.get('name'),
      Picture.fromJson(json.get('picture')),
      json.get('description'),
      User.fromJson(json.get('user')),
      PlantCondition.fromJson(json.get('plantCondition')),
      json.get('id')
    );
  }
}
