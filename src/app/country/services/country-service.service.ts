import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountrySmall, Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private urlBase: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  get regions(){
    return [...this._regions];
  }

  getCountryByRegion(region: string){
    const url: string = `${ this.urlBase }/region/${ region }?fields=name,cca2`;
    return this.http.get<CountrySmall[]>( url );
  }
 
  getBoundaryByCode(code: string):Observable<Country[]|[]>{
    if(code.length==0){
      return of([]);
    }
    const url: string = `${ this.urlBase }/alpha/${ code }`;
    return this.http.get<Country[]>( url );
  }

}
