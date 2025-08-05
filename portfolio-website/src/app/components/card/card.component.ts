import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="project-card card" (click)="onCardClick()">
      <div class="card-header">
        <h3>{{ project.title }}</h3>
        <span class="category-badge" [ngClass]="getCategoryClass(project.category)">{{ project.category }}</span>
      </div>
      
      <p class="description">{{ project.description }}</p>
      
      <div class="technologies">
        <span class="tech-tag" *ngFor="let tech of project.technologies">
          {{ tech }}
        </span>
      </div>
      
      <div class="card-actions">
        <a *ngIf="project.github" [href]="project.github" target="_blank" class="btn btn-primary">
          <span class="material-icons">code</span>
          GitHub
        </a>
        <a *ngIf="project.demo" [href]="project.demo" target="_blank" class="btn btn-secondary">
          <span class="material-icons">launch</span>
          Demo
        </a>
        <a *ngIf="project.docs" [href]="project.docs" target="_blank" class="btn btn-docs">
          <span class="material-icons">description</span>
          Docs
        </a>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      cursor: pointer;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .card-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      margin: 0;
    }
    .category-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;
    }
    .category-badge:has-text("Platform Engineering"),
    .project-card:has(.category-badge:contains("Platform Engineering")) .category-badge {
      background: #10b981;
    }
    .category-badge:has-text("Data Engineering"),
    .project-card:has(.category-badge:contains("Data Engineering")) .category-badge {
      background: #f59e0b;
    }
    .category-badge:has-text("Software Engineering"),
    .project-card:has(.category-badge:contains("Software Engineering")) .category-badge {
      background: #3b82f6;
    }
    .description {
      color: var(--secondary-color);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
    }
    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .tech-tag {
      background: var(--border);
      color: var(--text);
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.75rem;
    }
    .card-actions {
      display: flex;
      gap: 0.75rem;
    }
    .btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-secondary {
      background: var(--border);
      color: var(--text);
    }
    .btn-secondary:hover {
      background: var(--secondary-color);
      color: white;
    }
    .btn-docs {
      background: var(--accent-color);
      color: white;
    }
    .btn-docs:hover {
      background: #d97706;
      color: white;
    }
    .material-icons {
      font-size: 1rem;
    }
  `]
})
export class CardComponent {
  @Input() project!: Project;
  @Output() cardClick = new EventEmitter<Project>();

  onCardClick(): void {
    this.cardClick.emit(this.project);
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'Platform Engineering': return 'platform-badge';
      case 'Data Engineering': return 'data-badge';
      case 'Software Engineering': return 'software-badge';
      default: return 'default-badge';
    }
  }
}