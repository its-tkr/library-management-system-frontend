import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  private apiKey = 'http://localhost:3000/api';

  login(email: any, password: any): any {
    return this.http.post(this.apiKey + '/user/login', { userEmail: email, userPassword: password });
  }
  getBooks(books: any): any {
    return this.http.get(this.apiKey + books);
  }
  postBook(url: any, book: any): any {
    return this.http.post(this.apiKey + url, book);
  }
  putBook(url: any, book: any): any {
    return this.http.put(this.apiKey + url, book);
  }
  deleteBook(book: any): any {
    return this.http.delete(this.apiKey + book);
  }
  deleteRentBook(book: any, bookId: any): any {
    return this.http.delete(this.apiKey + book, bookId);
  }
  checkPassword(password: any): any {
    return this.http.post(this.apiKey + '/user/checkPassword', password);
  }
  updateUser(user: any): any {
    return this.http.post(this.apiKey + '/user/updateUser', user);
  }
  getUser(): any {
    return this.http.get(this.apiKey + '/user/getUser');
  }
}
