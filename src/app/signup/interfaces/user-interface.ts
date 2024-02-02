import { UserTypeInterface } from "./user-type-interface";


export interface UserInterface{
	id: number;
	firstName: string;
	lastName: String ;
	phoneNumber: number;
	email: string;
    password: string;
	userType: UserTypeInterface;
}