import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isCollapsed: boolean;

  links = [
    {
      link: '/zodiac',
      label: 'Zodiac'
    },
    {
      link: '/person',
      label: 'Person'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
