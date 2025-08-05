import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as yaml from 'js-yaml';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  github: string;
  demo?: string;
  docs?: string;
  featured: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable();

  constructor(private http: HttpClient) {}

  async loadProjects(): Promise<any> {
    try {
      const yamlText = await fetch('assets/yaml/projects.yaml').then(res => res.text());
      return yaml.load(yamlText);
    } catch (error) {
      console.error('Error loading YAML:', error);
      return { projects: [], skills: [], experience: [] };
    }
  }

  updateSearchTerm(term: string): void {
    this.searchTerm.next(term);
  }
}