import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, ProjectService } from '../../core/project.service';

@Component({
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <section class="page">
      <div class="heading"><div><h1>Projects</h1><p>Create and manage your delivery workspaces.</p></div><button (click)="showForm = !showForm">{{ showForm ? 'Cancel' : '+ New project' }}</button></div>
      @if (showForm) {
        <form class="create-form" (ngSubmit)="create()">
          <input name="name" placeholder="Project name" [(ngModel)]="name" required />
          <input name="description" placeholder="Description" [(ngModel)]="description" />
          <button type="submit">Create project</button>
        </form>
      }
      <div class="grid">
        @for (project of projects; track project.id) {
          <article><h2>{{ project.name }}</h2><p>{{ project.description || 'No description' }}</p><small>Created {{ project.createdAtUtc | date:'mediumDate' }}</small></article>
        } @empty { <div class="empty">No projects yet. Create your first project.</div> }
      </div>
    </section>
  `,
  styles: [`
    .page { max-width:1100px; margin:48px auto; padding:0 24px; } .heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px} h1{margin:0 0 6px;font-size:34px}.heading p{margin:0;color:#667085}
    button{padding:11px 16px;border:0;border-radius:8px;background:#172033;color:white;font-weight:700;cursor:pointer}.create-form{display:flex;gap:12px;margin-bottom:24px}.create-form input{flex:1;padding:12px;border:1px solid #d7dae2;border-radius:8px;font:inherit}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}article{padding:22px;background:white;border:1px solid #e7e9ef;border-radius:14px}article h2{margin-top:0}article p{color:#667085;min-height:42px}.empty{grid-column:1/-1;padding:40px;text-align:center;background:white;border:1px dashed #d7dae2;border-radius:14px;color:#667085}@media(max-width:750px){.grid{grid-template-columns:1fr}.heading{align-items:flex-start;gap:16px}.create-form{flex-direction:column}}
  `]
})
export class ProjectsComponent implements OnInit {
  private readonly service = inject(ProjectService);
  projects: Project[] = []; showForm = false; name = ''; description = '';
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe({ next: projects => this.projects = projects }); }
  create(): void { this.service.create(this.name, this.description).subscribe({ next: project => { this.projects = [project, ...this.projects]; this.name = ''; this.description = ''; this.showForm = false; } }); }
}
