import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

private apiUrl: string= 'https://restcountries.com/v3.1'
public cacheStore: CacheStore={
  byCapital: {term:'', countries:[]},
  byCountry: {term:'', countries:[]},
  byRegion : {region:'', countries:[]}
}

    constructor(private http: HttpClient) { }

  private getCountriesRequest(url :string):Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(()=>{
          return of([])
      }),
  );
  }

    searchCountryByAlphaCode(q:string):Observable<Country | null>{
        const url =`${this.apiUrl}/alpha/${q}`;
        return this.http.get<Country[]>(url)
        .pipe(
            map( countries => countries.length>0? countries[0]:null),
            catchError(error=>{
                return of(null)
            }),
            delay(1000)
        );
    }

    searchCapital( q : string): Observable<Country[]>{
      const url=`${this.apiUrl}/capital/${q}`;
       return this.getCountriesRequest(url)
       .pipe(
        tap( countries=> {
          this.cacheStore.byCapital ={ term:q, countries}
        } )
       );
    }

    searchCountry( q : string): Observable<Country[]>{
      const url=`${this.apiUrl}/name/${q}`
        return this.getCountriesRequest(url).pipe(
          tap( countries=> {
            this.cacheStore.byCountry ={ term:q, countries}
          } )
         );
    }

    searchRegion( q : Region): Observable<Country[]>{
      const url=`${this.apiUrl}/region/${q}`;
        return this.getCountriesRequest(url).pipe(
          tap( countries=> {
            this.cacheStore.byRegion ={ region:q, countries}
          } )
         );
    }
}
