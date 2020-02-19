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

  public buildGroup()
    : FormGroup {
    return this.formBuilder.group({
        birthday: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]]
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
