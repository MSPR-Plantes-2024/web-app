import {User} from "../../../core/models/user";

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

  toJson(): Map<string, any> {
    if (!this.sender?.id) {
      throw new Error('Sender must be defined');
    }
    if (!this.receiver?.id) {
      throw new Error('Receiver must be defined');
    }
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['text', this.text],
        ['date', this.date.toISOString()],
        ['sender', this.sender.id.toString()],
        ['receiver', this.receiver.id.toString()]
      ]
    );
  }

  static fromJson(json: Map<string, any>): Message {
    if (!json.get('sender')) {
      throw new Error('Sender must be defined');
    }
    if (!json.get('receiver')) {
      throw new Error('Receiver must be defined');
    }
    return new Message(
      json.get('text'),
      new Date(json.get('date')),
      User.fromJson(json.get('sender')),
      User.fromJson(json.get('receiver')),
      json.get('id')
    );
  }
}
