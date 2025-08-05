import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    this.setTheme(isDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkTheme.value);
  }

  private setTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}