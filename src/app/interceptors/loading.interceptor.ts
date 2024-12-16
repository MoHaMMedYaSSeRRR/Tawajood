import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../Services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private pendingRequests = 0;
  private pendingImages = 0;
  private isPageLoaded = false;

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.pendingRequests++; // Increase the request count
    this.loadingService.show(); // Show loading spinner

    return next.handle(req).pipe(
      finalize(() => {
        this.pendingRequests--; // Decrease the request count once the request is complete
        this.checkIfLoadingComplete(); // Check if all requests and images are loaded
      })
    );
  }

  // Call this method when an image is loaded
  imageLoaded() {
    this.pendingImages--;
    this.checkIfLoadingComplete();
  }

  // Call this method when an image fails to load
  imageFailed() {
    this.pendingImages--;
    this.checkIfLoadingComplete();
  }

  // Check if all requests and images are completed
  private checkIfLoadingComplete() {
    if (this.pendingRequests === 0 && this.pendingImages === 0) {
      // All requests and images are loaded, hide loading spinner
      this.loadingService.hide();
    }
  }

  // Function to track images loading
  trackImages() {
    const images = Array.from(document.getElementsByTagName('img'));

    this.pendingImages = images.length; // Set the number of images to track

    // Loop through all images and track their loading state
    images.forEach((image) => {
      if (image.complete) {
        this.imageLoaded(); // If already loaded
      } else {
        image.onload = () => this.imageLoaded();
        image.onerror = () => this.imageFailed();
      }
    });
  }

  // Listen for page load event to trigger image tracking
  onPageLoad() {
    if (!this.isPageLoaded) {
      this.isPageLoaded = true;
      this.trackImages(); // Start tracking images once the page loads
    }
  }

  // Call this method in your component to trigger the page load tracking
  public startTrackingOnPageLoad() {
    window.addEventListener('load', () => {
      this.onPageLoad();
    });
  }
}
