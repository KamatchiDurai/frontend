import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private userRole = '';
  private apiUrl = 'http://demo7675902.mockable.io/student';

  constructor(private http: HttpClient) { }

  login(userId: string, credential: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url);
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUserRole(): string {
    return this.userRole;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  setUserRole(userRole: string) {
    this.userRole = userRole;
  }

  logout() {
    this.userRole = '';
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
  }
}
