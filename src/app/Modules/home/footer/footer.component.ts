import { Component } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/Services/services.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  settings:any ={
    whatsapp:'01024848723',
    instgram:'',
    facebook:'',
    email:'info@tawajood.com'

  };
  constructor(private _ServicesService:ServicesService){}
  services:Service[]=[];
  ngOnInit(): void {
    this._ServicesService.getServices().subscribe(res => {
      console.log(res);
      this.services = res.data.services;
      console.log(this.services)
        });
  }
}
