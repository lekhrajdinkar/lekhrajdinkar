import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/data.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="dialog-content" (click)="$event.stopPropagation()">
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
            
            <div class="detail-section" *ngIf="project.github || project.demo">
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
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    .dialog-content {
      background: var(--surface);
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
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
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
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

  onOverlayClick(event: Event): void {
    this.closeDialog();
  }
}