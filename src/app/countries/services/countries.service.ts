import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

private apiUrl: string= 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient) { }
    
    searchCountryByAlphaCode(q:string):Observable<Country | null>{
        const url =`${this.apiUrl}/alpha/${q}`;
        return this.http.get<Country[]>(url)
        .pipe(
            map( countries => countries.length>0? countries[0]:null),
            catchError(error=>{
                return of(null)
            })
        );
    }

    searchCapital( q : string): Observable<Country[]>{
       return this.http.get<Country[]>(`${this.apiUrl}/capital/${q}`)
        .pipe(
            catchError(error=>{
                console.log(error);
                return of([])
            })
        );
    }

    searchCountry( q : string): Observable<Country[]>{
        return this.http.get<Country[]>(`${this.apiUrl}/name/${q}`)
         .pipe(
             catchError(error=>{
                 console.log(error);
                 return of([])
             })
         );
    }

    searchRegion( q : string): Observable<Country[]>{
        return this.http.get<Country[]>(`${this.apiUrl}/region/${q}`)
         .pipe(
             catchError(error=>{
                 console.log(error);
                 return of([])
             })
         );
    }
}