import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="header">
      <div class="header-left">
        <h1>Lekhraj Dinkar</h1>
        <span class="subtitle">Full Stack Developer</span>
      </div>
      
      <div class="header-center">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search projects..." 
            [(ngModel)]="searchTerm"
            (input)="onSearch()"
            class="search-input">
          <span class="material-icons search-icon">search</span>
        </div>
      </div>
      
      <div class="header-right">
        <button class="theme-toggle" (click)="toggleTheme()">
          <span class="material-icons">
            {{ (themeService.isDarkTheme$ | async) ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-left h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    .subtitle {
      font-size: 0.875rem;
      color: var(--secondary-color);
    }
    .search-container {
      position: relative;
      width: 300px;
    }
    .search-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--background);
      color: var(--text);
    }
    .search-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--secondary-color);
    }
    .theme-toggle {
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      color: var(--text);
      transition: background 0.3s ease;
    }
    .theme-toggle:hover {
      background: var(--border);
    }
  `]
})
export class HeaderComponent {
  searchTerm = '';

  constructor(
    public themeService: ThemeService,
    private dataService: DataService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSearch(): void {
    this.dataService.updateSearchTerm(this.searchTerm);
  }
}