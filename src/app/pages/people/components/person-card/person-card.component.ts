import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../../../shared/models/Person.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input()
  public person: Person;

  @Output('update')
  public update: EventEmitter<Person>;

  @Output()
  public delete: EventEmitter<number>;

  constructor() {
    this.update = new EventEmitter<Person>();
    this.delete = new EventEmitter<number>();
  }

  ngOnInit() {
  }

}
