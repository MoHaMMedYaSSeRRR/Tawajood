import { Component } from '@angular/core';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  gifSrc: string = '../../../../assets/images/tawagood.jpg';

  constructor(public loadingService: LoadingService) {}

  // Show loading overlay with reset GIF
  showLoadingOverlay() {
    this.resetGif();
    this.loadingService.show(5000); // Display overlay for 5 seconds
  }

  // Dynamically update the GIF source to reset the animation
  resetGif() {
    this.gifSrc = '';
    setTimeout(() => {
      this.gifSrc = '../../../../assets/images/Flow 1@256p-25fps.gif';
    });
  }
}
