import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/data.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" *ngIf="isOpen" [class.open]="isOpen">
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>{{ project?.title }}</h2>
          <button class="close-btn" (click)="closeDialog()">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="dialog-body" *ngIf="project">
          <div class="project-details">
            <p class="description">{{ project.description }}</p>
            
            <div class="detail-section">
              <h4>Technologies Used</h4>
              <div class="technologies">
                <span class="tech-tag" *ngFor="let tech of project.technologies">
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>Category</h4>
              <span class="category-badge">{{ project.category }}</span>
            </div>
            
            <div class="detail-section" *ngIf="project.details && project.details.length > 0">
              <h4>Project Details</h4>
              <ul class="details-list">
                <li *ngFor="let detail of project.details">{{ detail }}</li>
              </ul>
            </div>
            
            <div class="detail-section" *ngIf="project.github || project.demo || project.docs">
              <h4>Links</h4>
              <div class="links">
                <a *ngIf="project.github" [href]="project.github" target="_blank" class="btn btn-primary">
                  <span class="material-icons">code</span>
                  View Source Code
                </a>
                <a *ngIf="project.demo" [href]="project.demo" target="_blank" class="btn btn-secondary">
                  <span class="material-icons">launch</span>
                  Live Demo
                </a>
                <a *ngIf="project.docs" [href]="project.docs" target="_blank" class="btn btn-docs">
                  <span class="material-icons">description</span>
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 70%;
      background: var(--background);
      border-left: 1px solid var(--border);
      z-index: 1000;
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    }
    .dialog-overlay.open {
      transform: translateX(0);
      opacity: 1;
    }
    .dialog-content {
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    .dialog-header h2 {
      margin: 0;
      color: var(--text);
    }
    .close-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      color: var(--text);
      transition: background 0.3s ease;
    }
    .close-btn:hover {
      background: var(--border);
    }
    .dialog-body {
      padding: 1.5rem;
    }
    .description {
      color: var(--secondary-color);
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .detail-section {
      margin-bottom: 2rem;
    }
    .detail-section h4 {
      margin-bottom: 1rem;
      color: var(--text);
      font-weight: 600;
    }
    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tech-tag {
      background: var(--border);
      color: var(--text);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
    }
    .category-badge {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 500;
    }
    .links {
      display: flex;
      gap: 1rem;
    }
    .btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
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
    .details-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .details-list li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
      color: var(--secondary-color);
      line-height: 1.5;
    }
    .details-list li:before {
      content: '•';
      color: var(--primary-color);
      font-weight: bold;
      position: absolute;
      left: 0;
    }

  `]
})
export class DialogComponent {
  @Input() isOpen = false;
  @Input() project: Project | null = null;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
}