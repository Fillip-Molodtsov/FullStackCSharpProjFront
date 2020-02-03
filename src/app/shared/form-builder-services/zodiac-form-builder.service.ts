import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../models/Person.model';

@Injectable({
  providedIn: 'root'
})
export class ZodiacFormBuilderService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public buildGroup()
    : FormGroup {
    return this.formBuilder.group({
        birthday: ['', Validators.required]
      }
    );
  }

  public getDataFromForm(form: FormGroup)
    : string {
    const {birthday} = form.value;

    return birthday;
  }

}
