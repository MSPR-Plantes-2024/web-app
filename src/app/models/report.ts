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
}
