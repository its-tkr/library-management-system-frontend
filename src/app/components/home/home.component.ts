import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { RentbookComponent } from '../rentbook/rentbook.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    public authService: AuthService,
    public dialog: MatDialog
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
    const dialogRef=this.dialog.open(DeleteDialogComponent, {
      data:true,
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.api.deleteBook(`/books/${id}`).subscribe((data: any) => {
          var newBooks = this.books.filter((book: any) => {
            return book._id != id;
          });
          this.books = newBooks;
        });
      }
    })
  }
  rentBook(id:any):void{
    const dialogRef=this.dialog.open(RentbookComponent, {
      data:id,
      width: '100%',
    });
  }
}
@Component({
  selector: 'delete-dialog',
  template: '<h1 mat-dialog-title>Delete Book</h1><div mat-dialog-content>Would you like to delete this book?</div><div mat-dialog-actions><button mat-button mat-dialog-close>No</button><button mat-button [mat-dialog-close]="data" cdkFocusInitial>Yes</button></div>',
  styles: [],
  standalone: true,
  imports: [MaterialModule]
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}