import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../models/Person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonFormBuilderService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public buildGroup(person: Partial<Person>)
    : FormGroup {
    return this.formBuilder.group({
        birthday: [person ? person.birthday : '', [Validators.required]],
        name: [person ? person.name : '', [Validators.required, Validators.minLength(3)]],
        surname: [person ? person.surname : '', [Validators.required, Validators.minLength(3)]],
        email: [person ? person.email : '', [Validators.required, Validators.email]]
      }
    );
  }

  public getDataFromForm(form: FormGroup)
    : Partial<Person> {
    const {birthday, name, surname, email} = form.value;

    return new Person({
      birthday,
      name,
      surname,
      email
    });
  }
}
