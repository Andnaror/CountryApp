import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

private apiUrl: string= 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient) { }
    
    searchCapital( q : string): Observable<Country[]>{
       return this.http.get<Country[]>(`${this.apiUrl}/capital/${q}`)
        .pipe(
            catchError(error=>{
                console.log(error);
                return of([])
            })
        );
        //.subscribe();
    }
}