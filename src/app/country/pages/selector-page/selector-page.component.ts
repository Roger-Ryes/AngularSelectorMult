import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {

  regions: string[] = [];

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private countServic: CountryService) { }

  ngOnInit(): void {
    this.regions = this.countServic.regions;
  }

  save(){
    console.log(this.myForm.value);
  }

}
