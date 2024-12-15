import { Component, Renderer2 } from '@angular/core';
import { changelangService } from './Services/changelang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tawagood';
  isMobile = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    
  }

}
