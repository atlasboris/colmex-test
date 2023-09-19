import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly countriesURL = 'https://testpublic.cglms.com/countries/GetCountryList/';
  private readonly baseUrl = 'http://localhost:10392/';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.countriesURL}`);
  }

  save(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`,user)
  }


}
