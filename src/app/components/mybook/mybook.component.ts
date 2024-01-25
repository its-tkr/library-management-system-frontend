import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.scss'],
})
export class MybookComponent implements OnInit {
  public books!: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    this.api
      .getBooks(`/rentBooks/user`)
      .subscribe(
        (data: any) => {
          data.forEach((book: any) => {
            var returnDate = new Date(book.returnDate);
            if (today > returnDate) {
              book.expired = true;
            }
          });
          this.books = data;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  returnBook(id: any, bookId: any): void {
    this.api.deleteRentBook(`/rentBooks/${id}`,{bookId:bookId}).subscribe(
      (data: any) => {
        var newBooks=this.books.filter((book:any)=>{
          if(book._id!=id) return book
        })
        this.books=newBooks;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
