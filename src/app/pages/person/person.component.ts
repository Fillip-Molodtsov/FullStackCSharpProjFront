import {Component, OnInit} from '@angular/core';
import {PersonFormBuilderService} from '../../shared/form-builder-services/person-form-builder.service';
import {HttpPersonService} from '../../shared/http-services/http-person.service';
import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {PersonResponse} from '../../shared/models/PersonResponse.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public form: FormGroup;

  public personResponse: PersonResponse;

  public errorMessage: HttpErrorResponse;

  public isLoaded = true;

  constructor(
    private personFormBuilder: PersonFormBuilderService,
    private httpPersonService: HttpPersonService
  ) {
    this.form = this.personFormBuilder.buildGroup();
  }

  ngOnInit() {
  }

  private submit()
    : void {
    this.personResponse = null;
    this.errorMessage = null;
    this.isLoaded = false;
    const body = this.personFormBuilder.getDataFromForm(this.form);
    const d = new Date(body.personalInfo.birthday);
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    body.personalInfo.birthday = date;
    this.httpPersonService
      .postPerson(body)
      .pipe(
        finalize(() => {
          this.isLoaded = true;
        })
      )
      .subscribe(
        res => {
          this.personResponse = res;
        },
        error => {
          this.errorMessage = error;
        });
  }

}
