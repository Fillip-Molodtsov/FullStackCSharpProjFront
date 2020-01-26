import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZodiacResponse} from '../models/ZodiacResponse.model';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpZodiacService {

  private readonly baseUrl = environment.apiUrl;

  private urlZodiac: string;

  constructor(private http: HttpClient) {
    this.urlZodiac = `${this.baseUrl}zodiac/`;
  }

  public getZodiacTask(birthday: string)
    : Observable<ZodiacResponse> {
    return this.http.get<ZodiacResponse>(`${this.urlZodiac}${birthday}`);
  }


}
