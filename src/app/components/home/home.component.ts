import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    public authService: AuthService
  ) {
    window.onbeforeunload = (event) => {
      this.authService.logout();
    };
  }
  public books: any;

  ngOnInit(): void {
    this.api.getBooks('/books').subscribe(
      (data: any) => (this.books = data),
      (err: any) => console.log(err)
    );
  }
  deleteBook(id: any): void {
    this.api.deleteBook(`/books/${id}`).subscribe((data: any) => {
      var newBooks = this.books.filter((book: any) => {
        return book._id != id;
      });
      this.books = newBooks;
    });
  }
}
