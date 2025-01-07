import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  show(duration: number = 1000): void {
    this._loading = true;
    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    this._loading = false;
  }
}
