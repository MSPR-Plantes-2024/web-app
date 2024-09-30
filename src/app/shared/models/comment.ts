import {User} from "../../core/models/user";
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

  toJson(): Map<string, any> {
    if (!this.author?.id) {
      throw new Error('Author must be defined');
    }
    if (!this.report?.id) {
      throw new Error('Report must be defined');
    }
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['content', this.content],
        ['date', this.date.toISOString()],
        ['author', this.author.id.toString()],
        ['report', this.report.id.toString()]
      ]
    );
  }

  static fromJson(json: Map<string, any>): Comment {
    if (!json.get('author')) {
      throw new Error('Author must be defined');
    }
    if (!json.get('report')) {
      throw new Error('Report must be defined');
    }
    return new Comment(
      json.get('content'),
      new Date(json.get('date')),
      User.fromJson(json.get('author')),
      Report.fromJson(json.get('report')),
      json.get('id')
    );
  }
}
