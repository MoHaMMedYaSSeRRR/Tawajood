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

  imagePreloaded = false;

  preloadGif(): Promise<void> {
    return new Promise((resolve, reject) => {
      const gif = new Image();
      gif.src = '../../../../assets/images/Flow 1@256p-25fps.gif';
      gif.onload = () => {
        this.imagePreloaded = true;
        resolve();
      };
      gif.onerror = (error) => reject(error);
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.pendingRequests++;
    this.loadingService.show(5000); 

    // Ensure the GIF is preloaded before proceeding
    if (!this.imagePreloaded) {
      return new Observable<HttpEvent<any>>((observer) => {
        this.preloadGif()
          .then(() => {
            next.handle(req).subscribe({
              next: (event) => observer.next(event),
              error: (err) => observer.error(err),
              complete: () => observer.complete(),
            });
          })
          .catch((error) => observer.error(error));
      }).pipe(
        finalize(() => {
          this.pendingRequests--;
          this.checkIfLoadingComplete();
        })
      );
    } else {
      return next.handle(req).pipe(
        finalize(() => {
          this.pendingRequests--;
          this.checkIfLoadingComplete();
        })
      );
    }
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
      this.preloadGif(); // Preload the GIF
    });
  }
  
}
