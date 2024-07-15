import { Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent {
  isLoading = true; // Set this to true initially to show the preloader

  // Call this function when you want to hide the preloader
  hidePreloader(): void {
    this.isLoading = false;
  }
}
