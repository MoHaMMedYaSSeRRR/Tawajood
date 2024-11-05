import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allsolutions',
  templateUrl: './allsolutions.component.html',
  styleUrls: ['./allsolutions.component.scss']
})
export class AllsolutionsComponent {
  isInComponent:boolean = false;
  constructor( private router: Router){
    this.checkRoute();
  }
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/solutions';
   });
  }
}
