import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonFormBuilderService} from '../../shared/form-builder-services/person-form-builder.service';
import {HttpPersonService} from '../../shared/http-services/http-person.service';
import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {PersonResponse} from '../../shared/models/PersonResponse.model';
import {getDateParsed} from '../../shared/helpers/dateHelper';
import {Person} from '../../shared/models/Person.model';
import {PersonPassingService} from '../../shared/services/person-passing.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public personResponse: PersonResponse;

  public errorMessage: HttpErrorResponse;

  public isLoaded = true;

  public minDate: Date;

  public maxDate: Date;

  private person: Partial<Person>;

  private personSub: Subscription;

  constructor(
    private personFormBuilder: PersonFormBuilderService,
    private httpPersonService: HttpPersonService,
    private personPassingService: PersonPassingService
  ) {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 200);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
  }

  ngOnInit() {
    this.personSub = this.personPassingService.getParamPerson.subscribe(res => this.person = res);
    this.form = this.personFormBuilder.buildGroup(this.person);
  }

  ngOnDestroy()
    : void {
    this.personSub.unsubscribe();
  }

  private submit()
    : void {
    this.personResponse = null;
    this.errorMessage = null;
    this.isLoaded = false;
    const body = this.personFormBuilder.getDataFromForm(this.form);
    const d = new Date(body.birthday);
    body.birthday = getDateParsed(d);
    let sub;
    if (this.person) {
      body.id = this.person.id;
      sub = this.httpPersonService.putPerson(body);
    } else {
      sub = this.httpPersonService.postPerson(body);
    }
    sub.pipe(
      finalize(() => {
        this.isLoaded = true;
      })
    ).subscribe(
    res => {
      this.personResponse = res;
    },
    error => {
      this.errorMessage = error;
    });
  }

}
