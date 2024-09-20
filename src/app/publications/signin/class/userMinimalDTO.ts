import { UserType } from "../../publication/interfaces/user-type-interface";

export class UserMinimalDto{
    id!: number;
	firstName!: string;
	lastName!: string;
    
    UserTypeDTO!: UserType;
}
