import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FilterSortPersonParams} from '../models/FilterSortPersonParams';

@Injectable({
  providedIn: 'root'
})
export class PeopleFormBuilderService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public buildGroup()
    : FormGroup {
    return this.formBuilder.group({
        ps: [null],
        desc: [false],
        pf: [null],
        value: [null],
      }
    );
  }

  public getDataFromForm(form: FormGroup)
    : Partial<FilterSortPersonParams> {
    const {ps, desc, pf, value} = form.value;
    return new FilterSortPersonParams({
      ps, pf, desc, value
    });
  }
}
