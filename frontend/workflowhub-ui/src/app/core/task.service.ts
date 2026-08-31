import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TaskStatus = 'Todo' | 'InProgress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export interface TaskItem { id: string; projectId: string; title: string; description: string; status: TaskStatus; priority: TaskPriority; dueDateUtc?: string; }

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7001/api/tasks';
  getAll(projectId?: string): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(projectId ? `${this.apiUrl}?projectId=${projectId}` : this.apiUrl);
  }
  create(task: { projectId: string; title: string; description: string; priority: TaskPriority; dueDateUtc?: string }): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task);
  }
  updateStatus(id: string, status: TaskStatus): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, { status });
  }
}
