export class Person {
  birthday: string;
  name: string;
  surname: string;
  email: string;
  westSign: string;
  eastSign: string;
  isBirthday: boolean;
  isAdult: boolean;
  age: number;
  id: string;

  constructor(init: Partial<Person>) {
    Object.assign(this, init);
  }
}
