import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Person} from '../models/Person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonPassingService {
  private personSource = new BehaviorSubject<Partial<Person>>(null);
  getParamPerson = this.personSource.asObservable();

  constructor() {
  }

  public setParameterPerson(person: Partial<Person>) {
    this.personSource.next(person);
  }
}
