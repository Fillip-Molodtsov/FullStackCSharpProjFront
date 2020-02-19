import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Person} from '../models/Person.model';
import {Observable} from 'rxjs';
import {PersonResponse} from '../models/PersonResponse.model';

@Injectable({
  providedIn: 'root'
})
export class HttpPersonService {
  private readonly baseUrl = environment.apiUrl;

  private readonly urlPerson: string;

  constructor(private http: HttpClient) {
    this.urlPerson = `${this.baseUrl}person/`;
  }

  public postPerson(person: Partial<Person>)
    : Observable<PersonResponse> {
    return this.http.post<PersonResponse>(`${this.urlPerson}`, person);
  }


}
