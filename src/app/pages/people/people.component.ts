import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpPersonService} from '../../shared/http-services/http-person.service';
import {finalize} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Person} from '../../shared/models/Person.model';
import {FormGroup} from '@angular/forms';
import {PeopleFormBuilderService} from '../../shared/form-builder-services/people-form-builder.service';
import {PersonPassingService} from '../../shared/services/person-passing.service';
import {Router} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {


  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  public isLoaded = false;

  public disableSaveButton = false;

  public filterSortForm: FormGroup;

  public error: HttpErrorResponse;

  public personPropertiesList: Array<string>;

  public infoMessages: Array<string>;

  public pageSize = 5;

  public people: Array<Person>;

  public peopleSliced: Array<Person>;

  constructor(
    private httpPersonService: HttpPersonService,
    private peopleFormBuilderService: PeopleFormBuilderService,
    private personPassingService: PersonPassingService,
    private router: Router
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
        this.refreshFirstPage(0, this.pageSize);
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
        finalize(() => {
          this.disableSaveButton = false;
          this.submitQuery();
        })
      )
      .subscribe(res => {
        this.infoMessages.push(res);
      });
  }

  public submitQuery()
    : void {
    this.isLoaded = false;
    const filterSortPersonParams = this.peopleFormBuilderService.getDataFromForm(this.filterSortForm);
    let sub;
    if (!filterSortPersonParams.ps && !filterSortPersonParams.pf) {
      sub = this.httpPersonService.getPeople('Surname', false);
    } else if (!filterSortPersonParams.ps) {
      sub = this.httpPersonService.getFilteredPeople(filterSortPersonParams.pf, filterSortPersonParams.value);
    } else if (!filterSortPersonParams.pf) {
      sub = this.httpPersonService.getPeople(filterSortPersonParams.ps, filterSortPersonParams.desc);
      this.filterSortForm.get('value').reset();
    } else {
      sub = this.httpPersonService.getFilSortedPeople(filterSortPersonParams.pf, filterSortPersonParams.value,
        filterSortPersonParams.ps, filterSortPersonParams.desc);
    }
    sub.pipe(
      finalize(
        () => {
          this.isLoaded = true;
          this.paginator.firstPage();
        }
      )
    ).subscribe(
      res => {
        this.people = res;
        this.refreshFirstPage(0, this.pageSize);
      },
      error => this.error = error
    );
  }

  public addNewPerson()
    : void {
    this.personPassingService.setParameterPerson(null);
    this.router.navigate(['/person']);
  }

  public updateUser($event: Person) {
    this.personPassingService.setParameterPerson($event);
    this.router.navigate(['/person']);
  }

  public deleteUser($event: string) {
    this.isLoaded = false;
    this.httpPersonService.deletePerson($event)
      .pipe(
        finalize(() => {
          this.submitQuery();
        })
      )
      .subscribe(
        res => this.infoMessages.push(res),
        error => this.error = error
      );
  }

  public pageChange($event: PageEvent) {
    const start = $event.pageSize * $event.pageIndex;
    const end = start + $event.pageSize;
    this.refreshFirstPage(start, end);
  }

  private refreshFirstPage(start: number, end: number) {
    this.peopleSliced = this.people.slice(start, end);
  }
}
