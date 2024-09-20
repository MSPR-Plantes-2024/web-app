import {User} from "./user";
import {Report} from "./report";

export class Comment {
  id?: number;
  content: string;
  date: Date;
  author: User;
  report: Report;

  constructor(content: string, date: Date, author: User, report: Report, id?: number) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.author = author;
    this.report = report;
  }
}
