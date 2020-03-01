import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ZodiacComponent } from './pages/zodiac/zodiac.component';
import {AppRoutingModule} from './app-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { PersonComponent } from './pages/person/person.component';
import { PeopleComponent } from './pages/people/people.component';
import { PersonCardComponent } from './pages/people/components/person-card/person-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ZodiacComponent,
    NotFoundComponent,
    PersonComponent,
    PeopleComponent,
    PersonCardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
