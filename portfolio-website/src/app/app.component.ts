import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThreeAnimationComponent } from './components/animation/three-animation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, ThreeAnimationComponent],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-three-animation></app-three-animation>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    .content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      background: var(--background);
    }
  `]
})
export class AppComponent {
  title = 'portfolio-website';
}