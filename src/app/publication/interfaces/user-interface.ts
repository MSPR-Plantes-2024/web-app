import { UserType } from "./user-type-interface";

export class User{
    id!: number;
	firstName!: string;
	lastName!: string;
    email!: string;
	password?: string;
    UserTypeDTO!: UserType;
}
