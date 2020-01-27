export class ZodiacResponse {
  birthday: string;
  westSign: string;
  eastSign: string;
  age: number;
  specialMessages: Array<string>;

  constructor(init: Partial<ZodiacResponse>) {
    Object.assign(this, init);
  }
}
