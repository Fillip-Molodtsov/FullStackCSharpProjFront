import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../../../shared/models/Person.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {

  @Input()
  public person: Person;

  @Output()
  public update: EventEmitter<Person>;

  @Output()
  public delete: EventEmitter<string>;

  constructor() {
    this.update = new EventEmitter<Person>();
    this.delete = new EventEmitter<string>();
  }


  public updateUser() {
    this.update.emit(this.person);
  }

  public deleteUser() {
    this.delete.emit(this.person.id);
  }
}
