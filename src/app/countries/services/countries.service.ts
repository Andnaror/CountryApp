import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

private apiUrl: string= 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient) { }
    
    searchCountryAlphaCode(q:string):Observable<Country[]>{
        return this.http.get<Country[]>(`${this.apiUrl}/alpha/${q}`)
        .pipe(
            catchError(error=>{
                console.log(error);
                return of([])
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