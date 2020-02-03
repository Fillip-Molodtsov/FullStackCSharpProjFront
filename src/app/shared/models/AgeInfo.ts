export class AgeInfo {
  isBirthday: boolean;
  westSign: string;
  eastSign: string;
  age: number;
  isAdult: boolean;

  constructor(init: Partial<AgeInfo>) {
    Object.assign(this, init);
  }
}
