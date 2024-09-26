export class Picture {
  id?: number;
  date?: Date;
  data: Array<number>;

  constructor(data: Array<number>, date?: Date, id?: number) {
    this.id = id;
    this.date = date;
    this.data = data;
  }

  toJson(): Map<string, any> {
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['data', this.data],
        ['date', this.date?.toISOString() ?? new Date().toISOString()]
      ]
    );
  }

  static fromJson(json: Map<string, any>): Picture {
    return new Picture(
      json.get('data').split(',').map((value: string) => parseInt(value)),
      new Date(json.get('date')),
      json.get('id')
    );
  }
}
