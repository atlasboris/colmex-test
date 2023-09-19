import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-form-ui',
  templateUrl: './form-ui.component.html',
  styleUrls: ['./form-ui.component.scss']
})
export class FormUiComponent implements OnInit {
  form!: FormGroup;
  countries: string[] = [];
  countriesObj: any [] = [];
  constructor(private fb: FormBuilder, private service: ApiService ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['',[Validators.required]],
      phone:['',[Validators.required, Validators.pattern('^[0-9+-]+$')]]
    });

    this.service.getCountries().subscribe((val:any)=>{
      console.log(val)
      this.countriesObj = JSON.parse(val);
      this.countries = this.countriesObj.map(val=>val.CountryName);
    })
  }

  selectCoutry(country: string){
    this.form.controls['phone'].markAsTouched();
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(res=>{
        console.log(res)
      });
    }
  }
}
