import { UserInterface } from "../../signup/interfaces/user-interface";

export class Address{
    id!: number;
    postalAddress!: string;
    city!: string;
    zipCode!: string;
    otherInfo!: string;
    user! : UserInterface;
}