import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  template: `
    <section class="dashboard">
      <div class="hero">
        <div><p class="eyebrow">WORKFLOWHUB</p><h1>Good to see you 👋</h1><p>Manage projects, tasks and team delivery from one place.</p></div>
        <button (click)="logout()">Sign out</button>
      </div>
      <div class="cards">
        <article><span>Projects</span><strong>0</strong><small>Ready to create</small></article>
        <article><span>Open Tasks</span><strong>0</strong><small>Across your projects</small></article>
        <article><span>Completed</span><strong>0</strong><small>Keep the momentum</small></article>
      </div>
    </section>
  `,
  styles: [`
    .dashboard { max-width: 1100px; margin: 48px auto; padding: 0 24px; }
    .hero { display:flex; justify-content:space-between; align-items:center; gap:24px; margin-bottom:32px; }
    .eyebrow { font-size:12px; font-weight:800; letter-spacing:1.5px; color:#667085; } h1 { margin:6px 0; font-size:36px; } .hero p:last-child { color:#667085; }
    button { padding:11px 18px; border:1px solid #d7dae2; background:white; border-radius:8px; cursor:pointer; font-weight:700; }
    .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; } article { padding:24px; background:white; border:1px solid #e7e9ef; border-radius:14px; display:grid; gap:8px; } article span, small { color:#667085; } strong { font-size:32px; }
    @media(max-width:700px){ .cards{grid-template-columns:1fr}.hero{align-items:flex-start;flex-direction:column} }
  `]
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  logout(): void { this.auth.logout(); }
}
