import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RentBook } from 'src/app/interfaces/rent-book';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rentbook',
  templateUrl: './rentbook.component.html',
  styleUrls: ['./rentbook.component.scss'],
})
export class RentbookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    public dialogRef: MatDialogRef<RentbookComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any
    
  ) {}
  public book!: any;
  public rentError!: any;
  public rentBookForm!: FormGroup;
  public irentBook = new RentBook();
  public today=new Date();
  public minDate!:any;
  ngOnInit(): void {
    this.minDate=this.today.getFullYear() + '-' + String(this.today.getMonth() + 1).padStart(2, '0') + '-' + String(this.today.getDate()).padStart(2, '0');
    this.rentBookForm = new FormGroup({
      rentDays: new FormControl(),
    });
    this.api
      .getBooks(`/books/${this.data}`)
      .subscribe(
        (data: any) => {
          this.book = data;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  rentBook(): any {
    if (this.rentBookForm.valid) {
      this.api.postBook('/rentBooks/'+this.book._id, {rentDate:new Date(),returnDate:new Date(this.rentBookForm.value.rentDays)}).subscribe(
        (data: any) => {
          this.router.navigate(['/my-books'])
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
