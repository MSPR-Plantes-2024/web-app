import {User} from "./user";

export class Message {
  id?: number;
  text: string;
  date: Date;
  sender: User;
  receiver: User;

  constructor(text: string, date: Date, sender: User, receiver: User, id?: number) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.sender = sender;
    this.receiver = receiver;
  }
}
