import { Address } from "../../ajouter-publication/classes/adresse";

export class PublicationCreation{
    address!:Address;
    id!: number;
    creationDate!: Date;
    description!:string;
    addressId!: number;
    publisherId!: number;
    plantsId!: number[];
}