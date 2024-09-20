export class Picture {
  id?: number;
  date?: Date;
  data: Array<number>;

  constructor(data: Array<number>, date?: Date, id?: number) {
    this.id = id;
    this.date = date;
    this.data = data;
  }
}
