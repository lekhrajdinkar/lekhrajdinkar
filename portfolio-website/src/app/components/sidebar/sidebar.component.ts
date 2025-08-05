import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <div class="nav-section">
        <h3>Navigation</h3>
        <ul class="nav-list">
          <li><a routerLink="/dashboard" routerLinkActive="active">
            <span class="material-icons">dashboard</span>
            Dashboard
          </a></li>
          <li><a href="#projects">
            <span class="material-icons">work</span>
            Projects
          </a></li>
          <li><a href="#skills">
            <span class="material-icons">code</span>
            Skills
          </a></li>
          <li><a href="#experience">
            <span class="material-icons">timeline</span>
            Experience
          </a></li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h3>Categories</h3>
        <ul class="nav-list">
          <li><a href="#software">Software Engineering</a></li>
          <li><a href="#data">Data Engineering</a></li>
          <li><a href="#platform">Platform Engineering</a></li>
        </ul>
      </div>
      
      <div class="nav-section">
        <h3>Connect</h3>
        <div class="social-links">
          <a href="https://github.com/lekhrajdinkar" target="_blank">
            <span class="material-icons">code</span>
          </a>
          <a href="https://linkedin.com/in/lekhraj-dinkar-25872140" target="_blank">
            <span class="material-icons">business</span>
          </a>
          <a href="mailto:lekhrajdinkarus@gmail.com">
            <span class="material-icons">email</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: var(--surface);
      border-right: 1px solid var(--border);
      padding: 2rem 1rem;
      overflow-y: auto;
    }
    .nav-section {
      margin-bottom: 2rem;
    }
    .nav-section h3 {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--secondary-color);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .nav-list {
      list-style: none;
    }
    .nav-list li {
      margin-bottom: 0.5rem;
    }
    .nav-list a {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      color: var(--text);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .nav-list a:hover,
    .nav-list a.active {
      background: var(--primary-color);
      color: white;
    }
    .nav-list .material-icons {
      margin-right: 0.75rem;
      font-size: 1.25rem;
    }
    .social-links {
      display: flex;
      gap: 0.5rem;
    }
    .social-links a {
      padding: 0.5rem;
      border-radius: 8px;
      color: var(--text);
      transition: all 0.3s ease;
    }
    .social-links a:hover {
      background: var(--primary-color);
      color: white;
    }
  `]
})
export class SidebarComponent {}