import {ZodiacResponse} from './ZodiacResponse.model';

export class Person {
  personalInfo: {
    birthday: string;
    name: string;
    surname: string;
    email: string;
  };
  zodiacResponse: ZodiacResponse;

  constructor(init: Partial<Person>) {
    Object.assign(this, init);
  }
}
