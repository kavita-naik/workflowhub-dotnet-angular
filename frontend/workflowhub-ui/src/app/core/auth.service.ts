import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse { accessToken: string; expiresAtUtc: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'https://localhost:7001/api/auth';
  private readonly tokenKey = 'workflowhub_access_token';

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => localStorage.setItem(this.tokenKey, response.accessToken))
    );
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password }).pipe(
      tap(response => localStorage.setItem(this.tokenKey, response.accessToken))
    );
  }

  getToken(): string | null { return localStorage.getItem(this.tokenKey); }
  isAuthenticated(): boolean { return !!this.getToken(); }
  logout(): void { localStorage.removeItem(this.tokenKey); this.router.navigate(['/login']); }
}
