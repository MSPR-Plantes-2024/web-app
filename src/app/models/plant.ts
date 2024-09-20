import {Address} from "./address";
import {Picture} from "./picture";
import {User} from "./user";
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
}
