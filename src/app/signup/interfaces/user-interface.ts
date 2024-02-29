import { UserTypeInterface } from "./user-type-interface";


export class UserInterface{
	id!: number;
	firstName!: string;
	lastName!: String ;
	email!: string;
    password?: string;
	userType?: UserTypeInterface;
 
}