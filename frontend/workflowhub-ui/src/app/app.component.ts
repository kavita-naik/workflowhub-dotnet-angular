import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="app-shell">
      <header class="topbar">
        <strong>WorkFlowHub</strong>
        <span>Project & Task Management</span>
      </header>
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-shell { min-height: 100vh; background: #f6f7fb; color: #172033; font-family: Inter, Arial, sans-serif; }
    .topbar { height: 64px; padding: 0 32px; display: flex; align-items: center; gap: 18px; background: #fff; border-bottom: 1px solid #e7e9ef; }
    .topbar strong { font-size: 20px; }
    .topbar span { color: #6b7280; font-size: 14px; }
  `]
})
export class AppComponent {}
