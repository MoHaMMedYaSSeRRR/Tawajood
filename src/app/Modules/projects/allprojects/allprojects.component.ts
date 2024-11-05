import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/Services/projects.service';

@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.scss']
})
export class AllprojectsComponent {
  isInComponent:boolean = false;
  isMobile=false;

  mobileApp:Project[]=[];
  websites:Project[] = [];
  constructor( private router: Router , 
    private _ProjectsService:ProjectsService
  ){
   
  }
  checkRoute(): void {
    this.router.events.subscribe(() => {
      this.isInComponent = this.router.url === '/projects';
   });
  }
  ngOnInit(): void {
    this.isMobile=window.innerWidth<=768;

    this.checkRoute();
    this._ProjectsService.getMobileProjects().subscribe({
      next: (projects) => {
        this.mobileApp = projects.data.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this._ProjectsService.getWebProjects().subscribe({
      next: (projects) => {
        this.websites = projects.data.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
    
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed:1200,
    smartSpeed: 200,
    center: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1.2
      }
    },
    nav: true
  }
}
