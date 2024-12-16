import { Component, Renderer2, OnInit } from '@angular/core';
import { changelangService } from './Services/changelang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tawagood';
  isMobile = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Check if the current device is mobile
    this.isMobile = window.innerWidth <= 768;

    // Initialize Google Tag Manager data layer if not already initialized
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Track initial page load event
    this.trackPageView(window.location.pathname);

    // Listen for route changes and track them (if you're using Angular Router, add this logic)
    // Uncomment if Angular Router is used
    /*
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.trackPageView(event.urlAfterRedirects);
      }
    });
    */
  }

  /**
   * Send a custom event to Google Tag Manager
   * @param eventName - Name of the event
   * @param eventParams - Additional parameters for the event
   */
  sendCustomEvent(eventName: string, eventParams: Record<string, any>): void {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }

  /**
   * Track page views in Google Tag Manager
   * @param pagePath - Path of the current page
   */
  private trackPageView(pagePath: string): void {
    window.dataLayer.push({
      event: 'pageview',
      page: pagePath
    });
  }

  /**
   * Example: Track button click event
   */
  trackButtonClick(): void {
    this.sendCustomEvent('button_click', {
      category: 'User Interaction',
      action: 'Click',
      label: 'Main Button'
    });
  }
}
