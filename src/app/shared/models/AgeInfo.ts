export class AgeInfo {
  isBirthday: boolean;
  westSign: string;
  eastSign: string;
  age: number;

  constructor(init: Partial<AgeInfo>) {
    Object.assign(this, init);
  }
}
