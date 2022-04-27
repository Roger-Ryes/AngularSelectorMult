import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { CountrySmall, Country } from '../../interfaces/countries.interface';
import { CountryService } from '../../services/country-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {

  regions: string[] = [];
  countries: CountrySmall[]=[];
  countriesBoundary: String[]|[]=[];
  
  load:boolean = false;

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    boundary: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private countServic: CountryService) { }

  ngOnInit(): void {
    this.regions = this.countServic.regions;

    // Obtener valor de region
    // this.myForm.get("region")?.valueChanges.subscribe(resp=>{
    //   this.countServic.getCountryByRegion(resp)
    //   .subscribe(countries=>{
    //     this.countries = countries;
    //     console.log(countries);
    //   })
    // })
    this.myForm.get("region")?.valueChanges
    .pipe( 
      tap( 
        (_)=>{ 
          this.myForm.get("country")?.reset(""); 
          this.load = true;
        }
      ),
      switchMap( region => this.countServic.getCountryByRegion(region)))
    .subscribe(
      countries=>{ 
        this.countries = countries;
        this.load = false;
       }
    );


    this.myForm.get("country")?.valueChanges
    .pipe(
      tap( ()=>{
        this.countriesBoundary = [];
        this.myForm.get("boundary")?.reset("");
      } ),
      switchMap( resp=> this.countServic.getBoundaryByCode(resp)))
    .subscribe( resp=>{
      this.countriesBoundary = resp[0].borders || [];
    });
  }

  save(){
    console.log(this.myForm.value);
  }

}
