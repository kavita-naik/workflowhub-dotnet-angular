import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem, TaskPriority, TaskService, TaskStatus } from '../../core/task.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="page">
      <div class="heading"><div><h1>Task board</h1><p>Track delivery from backlog to done.</p></div><button (click)="showForm = !showForm">{{ showForm ? 'Cancel' : '+ New task' }}</button></div>
      @if (showForm) {
        <form class="create-form" (ngSubmit)="create()">
          <input name="title" placeholder="Task title" [(ngModel)]="title" required />
          <select name="priority" [(ngModel)]="priority"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
          <button type="submit">Create task</button>
        </form>
      }
      <div class="board">
        @for (column of columns; track column.status) {
          <section class="column"><h2>{{ column.label }} <span>{{ byStatus(column.status).length }}</span></h2>
            @for (task of byStatus(column.status); track task.id) {
              <article><div class="priority">{{ task.priority }}</div><h3>{{ task.title }}</h3><p>{{ task.description || 'No description' }}</p><select [ngModel]="task.status" (ngModelChange)="changeStatus(task, $event)"><option value="Todo">Todo</option><option value="InProgress">In Progress</option><option value="Done">Done</option></select></article>
            } @empty { <div class="empty">No tasks</div> }
          </section>
        }
      </div>
    </section>
  `,
  styles: [`
    .page{max-width:1200px;margin:48px auto;padding:0 24px}.heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}h1{margin:0 0 6px;font-size:34px}.heading p{margin:0;color:#667085}button{padding:11px 16px;border:0;border-radius:8px;background:#172033;color:#fff;font-weight:700;cursor:pointer}.create-form{display:flex;gap:12px;margin-bottom:24px}.create-form input,.create-form select,article select{padding:11px;border:1px solid #d7dae2;border-radius:8px;background:#fff;font:inherit}.create-form input{flex:1}.board{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.column{background:#eef0f4;border-radius:14px;padding:16px;min-height:400px}.column h2{font-size:16px;margin:4px 4px 14px}.column h2 span{color:#667085;font-size:13px}.column article{background:#fff;padding:16px;margin-bottom:12px;border:1px solid #e2e5eb;border-radius:10px}.column article h3{margin:8px 0}.column article p{color:#667085;font-size:13px}.priority{font-size:11px;font-weight:800;text-transform:uppercase;color:#667085}.empty{text-align:center;color:#98a2b3;padding:36px 8px}@media(max-width:800px){.board{grid-template-columns:1fr}.heading{align-items:flex-start;gap:16px}.create-form{flex-direction:column}}
  `]
})
export class TaskBoardComponent implements OnInit {
  private readonly service = inject(TaskService);
  tasks: TaskItem[] = []; showForm = false; title = ''; priority: TaskPriority = 'Medium';
  readonly columns: { status: TaskStatus; label: string }[] = [{ status: 'Todo', label: 'Todo' }, { status: 'InProgress', label: 'In Progress' }, { status: 'Done', label: 'Done' }];
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getAll().subscribe({ next: tasks => this.tasks = tasks }); }
  byStatus(status: TaskStatus): TaskItem[] { return this.tasks.filter(x => x.status === status); }
  create(): void { this.service.create({ projectId: '00000000-0000-0000-0000-000000000000', title: this.title, description: '', priority: this.priority }).subscribe({ next: task => { this.tasks = [...this.tasks, task]; this.title = ''; this.showForm = false; } }); }
  changeStatus(task: TaskItem, status: TaskStatus): void { this.service.updateStatus(task.id, status).subscribe({ next: () => task.status = status }); }
}
