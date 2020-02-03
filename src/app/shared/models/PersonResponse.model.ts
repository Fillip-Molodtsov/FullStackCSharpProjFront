import {Person} from './Person.model';

export class PersonResponse {
  person: Person;
  specialMessages: Array<string>;

  constructor(init: Partial<PersonResponse>) {
    Object.assign(this, init);
  }
}
