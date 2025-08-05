import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Project } from '../../services/data.service';
import { CardComponent } from '../card/card.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, DialogComponent],
  template: `
    <div class="dashboard">
      <section class="hero-section">
        <h1>Welcome to My Portfolio</h1>
        <p>Exploring Software Engineering, Data Engineering, and Platform Engineering</p>
      </section>

      <section class="featured-projects" id="projects">
        <h2>Featured Projects</h2>
        <div class="projects-grid">
          <app-card 
            *ngFor="let project of filteredProjects" 
            [project]="project"
            (cardClick)="openDialog($event)">
          </app-card>
        </div>
      </section>

      <section class="skills-section" id="skills">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          <div class="skill-category" *ngFor="let skillGroup of data.skills">
            <h3>{{ skillGroup.category }}</h3>
            <div class="skills-list">
              <span class="skill-tag" *ngFor="let skill of skillGroup.items">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="experience-section" id="experience">
        <h2>Experience</h2>
        <div class="experience-timeline">
          <div class="experience-item" *ngFor="let exp of data.experience">
            <div class="experience-content">
              <h3>{{ exp.position }}</h3>
              <h4>{{ exp.company }}</h4>
              <span class="duration">{{ exp.duration }}</span>
              <p>{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <app-dialog 
      [isOpen]="isDialogOpen" 
      [project]="selectedProject"
      (close)="closeDialog()">
    </app-dialog>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero-section {
      text-align: center;
      padding: 4rem 0;
      margin-bottom: 4rem;
    }
    .hero-section h1 {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 1rem;
    }
    .hero-section p {
      font-size: 1.25rem;
      color: var(--secondary-color);
    }
    section {
      margin-bottom: 4rem;
    }
    h2 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 2rem;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .skill-category {
      background: var(--surface);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid var(--border);
    }
    .skill-category h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 1rem;
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill-tag {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .experience-timeline {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .experience-item {
      background: var(--surface);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid var(--border);
      position: relative;
    }
    .experience-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    .experience-content h4 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }
    .duration {
      font-size: 0.875rem;
      color: var(--secondary-color);
      font-weight: 500;
    }
    .experience-content p {
      color: var(--secondary-color);
      line-height: 1.6;
      margin-top: 1rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  data: any = { projects: [], skills: [], experience: [] };
  filteredProjects: Project[] = [];
  isDialogOpen = false;
  selectedProject: Project | null = null;

  constructor(private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    this.data = await this.dataService.loadProjects();
    this.filteredProjects = this.data.projects;
    
    this.dataService.searchTerm$.subscribe(term => {
      this.filterProjects(term);
    });
  }

  private filterProjects(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredProjects = this.data.projects;
      return;
    }
    
    this.filteredProjects = this.data.projects.filter((project: Project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  openDialog(project: Project): void {
    this.selectedProject = project;
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedProject = null;
  }
}