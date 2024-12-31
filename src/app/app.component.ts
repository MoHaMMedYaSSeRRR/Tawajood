import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tawagood';
  isMobile = false;
  currentLang: string = '';

  private routerSubscription!: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the current device is mobile and listen for window resize changes
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', this.onResize.bind(this));

    // Initialize Google Tag Manager data layer if not already initialized
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Track initial page load event
    this.trackPageView(window.location.pathname);

    // Subscribe to route changes and track them
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.trackPageView(event.urlAfterRedirects);
      }
    });
    this.currentLang = localStorage.getItem('currentLang') || 'en'; // Default to 'en' if no language set
    this.applyTextAlignToParagraphs();
  }
  applyTextAlignToParagraphs(): void {
    const paragraphs = this.document.querySelectorAll('p');
    paragraphs.forEach((p: HTMLElement) => {
      if (this.currentLang === 'en') {
        this.renderer.removeClass(document.body, 'lang-ar'); // Remove lang-ar class for non-Arabiؤ
      } else {
        this.renderer.addClass(document.body, 'lang-ar'); // Add lang-ar class to body for Arabic

      }
    });
  }
  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    // Clean up the resize event listener
    window.removeEventListener('resize', this.onResize);
  }

  /**
   * Send a custom event to Google Tag Manager
   * @param eventName - Name of the event
   * @param eventParams - Additional parameters for the event
   */
  sendCustomEvent(eventName: string, eventParams: Record<string, any>): void {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  /**
   * Track page views in Google Tag Manager
   * @param pagePath - Path of the current page
   */
  private trackPageView(pagePath: string): void {
    window.dataLayer.push({
      event: 'pageview',
      page: pagePath,
    });
  }

  /**
   * Example: Track button click event
   */
  trackButtonClick(): void {
    this.sendCustomEvent('button_click', {
      category: 'User Interaction',
      action: 'Click',
      label: 'Main Button',
    });
  }

  /**
   * Handle window resize to detect if the device is mobile or not
   */
  private onResize(): void {
    this.isMobile = window.innerWidth <= 768;
  }
}
