import {Publication} from "./publication";
import {Picture} from "./picture";

export class Report {
  id?: number;
  title: string;
  date: Date;
  publication: Publication;
  pictures: Array<Picture>;
  text?: string;

  constructor(title: string, date: Date, publication: Publication, pictures: Array<Picture>, text?: string, id?: number) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.publication = publication;
    this.pictures = pictures;
    this.text = text;
  }

  toJson(): Map<string, any> {
    if (!this.publication?.id) {
      throw new Error('Publication must be defined');
    }
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['title', this.title],
        ['date', this.date.toISOString()],
        ['publication', this.publication.id.toString()],
        ['pictures', this.pictures.map((picture: Picture) => picture.toJson())],
        ['text', this.text]
      ]
    );
  }

  static fromJson(json: Map<string, any>): Report {
    if (!json.get('publication')) {
      throw new Error('Publication must be defined');
    }
    return new Report(
      json.get('title'),
      new Date(json.get('date')),
      Publication.fromJson(json.get('publication')),
      json.get('pictures') ? (json.get('reports') as Array<Map<string, any>>).map(picture => Picture.fromJson(picture)) : [], 
      json.get('text'),
      json.get('id')
    );
  }
}
