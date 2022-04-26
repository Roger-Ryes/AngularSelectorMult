import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountrySmall } from '../../interfaces/countries.interface';
import { CountryService } from '../../services/country-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {

  regions: string[] = [];
  countries: CountrySmall[]=[];

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private countServic: CountryService) { }

  ngOnInit(): void {
    this.regions = this.countServic.regions;

    // Obtener valor de region
    this.myForm.get("region")?.valueChanges.subscribe(resp=>{
      this.countServic.getCountryByRegion(resp)
      .subscribe(countries=>{
        this.countries = countries;
        console.log(countries);
      })
    })
  }

  save(){
    console.log(this.myForm.value);
  }

}
