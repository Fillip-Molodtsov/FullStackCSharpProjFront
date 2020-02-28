import {Component, OnInit} from '@angular/core';
import {HttpPersonService} from '../../shared/http-services/http-person.service';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Person} from '../../shared/models/Person.model';
import {FormGroup} from '@angular/forms';
import {PeopleFormBuilderService} from '../../shared/form-builder-services/people-form-builder.service';
import {Observable} from 'rxjs';
import {log} from 'util';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public isLoaded = false;

  public disableSaveButton = false;

  public filterSortForm: FormGroup;

  public error: HttpErrorResponse;

  public personPropertiesList: Array<string>;

  public infoMessages: Array<string>;

  public people: Array<Person>;

  constructor(
    private httpPersonService: HttpPersonService,
    private peopleFormBuilderService: PeopleFormBuilderService
  ) {
    this.infoMessages = [];
    this.filterSortForm = this.peopleFormBuilderService.buildGroup();
  }

  ngOnInit() {
    this.httpPersonService.getPeople('Surname', false)
      .pipe(
        finalize(
          () => this.isLoaded = true
        )
      ).subscribe(
      res => {
        this.people = res;
      },
      error => this.error = error
    );
    this.httpPersonService.getProperties()
      .pipe(
        finalize(
          () => this.isLoaded = true
        )
      ).subscribe(
      res => {
        this.personPropertiesList = res;
      },
      error => this.error = error
    );
  }

  public save()
    : void {
    this.disableSaveButton = true;
    this.httpPersonService.save()
      .pipe(
        finalize(() => this.disableSaveButton = false)
      )
      .subscribe(res => {
        this.infoMessages.push(res);
      });
  }

  public submitQuery()
    : void {
    this.isLoaded = false;
    const filterSortPersonParams = this.peopleFormBuilderService.getDataFromForm(this.filterSortForm);
    console.log(filterSortPersonParams.pf);
    let sub;
    if (!filterSortPersonParams.ps && !filterSortPersonParams.pf) {
      sub = this.httpPersonService.getPeople('Surname', false);
    } else if (!filterSortPersonParams.ps) {
      sub = this.httpPersonService.getFilteredPeople(filterSortPersonParams.pf, filterSortPersonParams.value);
    } else if (!filterSortPersonParams.pf) {
      sub = this.httpPersonService.getPeople(filterSortPersonParams.ps, filterSortPersonParams.desc);
    } else {
      sub = this.httpPersonService.getFilSortedPeople(filterSortPersonParams.pf, filterSortPersonParams.value,
        filterSortPersonParams.ps, filterSortPersonParams.desc);
    }
    sub.pipe(
      finalize(
        () => this.isLoaded = true
      )
    ).subscribe(
      res => {
        console.log(res);
        this.people = res;
      },
      error => this.error = error
    );
  }
}
