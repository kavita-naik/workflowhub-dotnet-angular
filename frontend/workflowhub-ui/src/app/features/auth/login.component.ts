import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="auth-card">
      <h1>Welcome back</h1>
      <p>Sign in to WorkFlowHub</p>
      <form (ngSubmit)="login()">
        <label>Email<input name="email" type="email" [(ngModel)]="email" required /></label>
        <label>Password<input name="password" type="password" [(ngModel)]="password" required /></label>
        <button type="submit">Sign in</button>
      </form>
      @if (error) { <div class="error">{{ error }}</div> }
      <a routerLink="/register">Create an account</a>
    </section>
  `,
  styles: [`
    .auth-card { width: min(420px, calc(100% - 40px)); margin: 80px auto; padding: 32px; background: white; border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,.08); }
    h1 { margin-bottom: 4px; } p { color: #6b7280; margin-top: 0; }
    form { display: grid; gap: 18px; margin: 28px 0; } label { display: grid; gap: 7px; font-weight: 600; }
    input { padding: 12px; border: 1px solid #d7dae2; border-radius: 8px; font: inherit; }
    button { padding: 12px; border: 0; border-radius: 8px; background: #172033; color: white; font-weight: 700; cursor: pointer; }
    .error { color: #b42318; margin-bottom: 16px; }
  `]
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  email = '';
  password = '';
  error = '';

  login(): void {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.error = 'Invalid email or password.'
    });
  }
}
