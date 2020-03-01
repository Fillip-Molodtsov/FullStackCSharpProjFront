import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Person} from '../models/Person.model';
import {Observable} from 'rxjs';
import {PersonResponse} from '../models/PersonResponse.model';
import {PersonProperties} from '../models/PersonProperties';

@Injectable({
  providedIn: 'root'
})
export class HttpPersonService {
  private readonly baseUrl = environment.apiUrl;

  private readonly urlPerson: string;

  constructor(private http: HttpClient) {
    this.urlPerson = `${this.baseUrl}people/`;
  }

  public getProperties()
    : Observable<string[]> {
    return this.http.get<string[]>(`${this.urlPerson}prop`);
  }

  public save()
    : Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>(`${this.urlPerson}save`, {headers, responseType: 'text' as 'json'});
  }

  public getFilSortedPeople(pf: PersonProperties, value: string,
                            ps: PersonProperties, desc: boolean)
    : Observable<Person[]> {
    const params = new HttpParams()
      .set('pf', pf)
      .set('value', value)
      .set('ps', ps)
      .set('desc', desc.toString());
    return this.http.get<Person[]>(`${this.urlPerson}fs`, {params});
  }

  public getFilteredPeople(prop: PersonProperties, value: string)
    : Observable<Person[]> {
    const params = new HttpParams()
      .set('pf', prop)
      .set('value', value);
    return this.http.get<Person[]>(`${this.urlPerson}filter`, {params});
  }

  public getPeople(prop: PersonProperties, desc: boolean)
    : Observable<Person[]> {
    const params = new HttpParams()
      .set('ps', prop)
      .set('desc', desc.toString());
    return this.http.get<Person[]>(`${this.urlPerson}`, {params});
  }

  public postPerson(person: Partial<Person>)
    : Observable<PersonResponse> {
    return this.http.post<PersonResponse>(`${this.urlPerson}`, person);
  }

  public putPerson(person: Partial<Person>)
    : Observable<PersonResponse> {
    return this.http.put<PersonResponse>(`${this.urlPerson}`, person);
  }

  public deletePerson(id: string)
    : Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete<string>(`${this.urlPerson}${id}`,{headers, responseType: 'text' as 'json'});
  }
}
