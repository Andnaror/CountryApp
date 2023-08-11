import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {
  constructor( private countriesService:CountriesService){
  }

  public countries:Country[]=[]

  SearchByRegion( term:string ):void{
    this.countriesService.searchRegion(term)
    .subscribe(countries=>{
      this.countries = countries;
    });
  }
}
