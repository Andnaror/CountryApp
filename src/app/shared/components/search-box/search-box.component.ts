import { Component,  EventEmitter,  Input, Output } from '@angular/core';
import { CountriesService } from 'src/app/countries/services/countries.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string='';
  
  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  constructor(private countriesService:CountriesService){

  }

  emitValue(value:string):void{
    this.onValue.emit(value)
  }

}
