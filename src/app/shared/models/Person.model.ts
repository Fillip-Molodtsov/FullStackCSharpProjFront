export class Person {
  birthday: string;

  constructor(init: Partial<Person>) {
    Object.assign(this, init);
  }
}
