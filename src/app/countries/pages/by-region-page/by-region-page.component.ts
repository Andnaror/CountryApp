import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit{
  constructor( private countriesService:CountriesService){

  }
  ngOnInit(): void {
    this.countries=this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion=this.countriesService.cacheStore.byRegion.region;
  }
  public selectedRegion:Region='';
  public countries:Country[]=[];
  public regions:Region[]=['Africa','Americas','Europe','Asia','Oceania'];

  SearchByRegion( term:Region ):void{
    this.selectedRegion=term;
    this.countriesService.searchRegion(term)
    .subscribe(countries=>{
      this.countries = countries;
    });
  }
}
