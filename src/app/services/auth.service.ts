import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = 'http://localhost:3000/api';
  public isAdmin: boolean = false;
  public isUser: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: any, password: any): any {
    return this.http.post(this.apiKey + '/user/login', { userEmail: email, userPassword: password });
  }
  
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    this.isAdmin = false;
    this.isUser = false;
  }
}
