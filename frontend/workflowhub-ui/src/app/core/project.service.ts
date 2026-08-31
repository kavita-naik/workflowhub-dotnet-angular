import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project { id: string; name: string; description: string; createdAtUtc: string; }

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7001/api/projects';

  getAll(): Observable<Project[]> { return this.http.get<Project[]>(this.apiUrl); }
  create(name: string, description: string): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, { name, description });
  }
}
