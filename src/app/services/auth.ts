import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'https://localhost:7286/api/auth';

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveRole(role: string | number) {
    localStorage.setItem('role', String(role));
  }

  getRole(): number | null {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      const roleNumber = Number(storedRole);
      return Number.isNaN(roleNumber) ? null : roleNumber;
    }

    const token = this.getToken();
    if (!token) {
      return null;
    }

    const payload = this.decodeJwtPayload(token);
    if (!payload) {
      return null;
    }

    const roleClaim = payload.role ?? payload.roles ?? payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (typeof roleClaim === 'number') {
      return roleClaim;
    }
    if (typeof roleClaim === 'string') {
      const parsed = Number(roleClaim);
      return Number.isNaN(parsed) ? null : parsed;
    }

    return null;
  }

  private decodeJwtPayload(token: string): any | null {
    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }
    try {
      const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(payload.split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
    } catch {
      return null;
    }
  }
}

