import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import {AlertModule, BsDatepickerModule, CollapseModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    CollapseModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    AlertModule,
    FormsModule,
    HttpClientModule,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
  ]
})
export class SharedModule { }
