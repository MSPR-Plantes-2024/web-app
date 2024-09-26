export class PlantCondition {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.id = id;
    this.name = name;
  }

  toJson(): Map<string, any> {
    return new Map<string, any>(
      [
        ['id', this.id?.toString() ?? ''],
        ['name', this.name]
      ]
    );
  }

  static fromJson(json: Map<string, any>): PlantCondition {
    return new PlantCondition(
      json.get('name'),
      json.get('id')
    );
  }
}
