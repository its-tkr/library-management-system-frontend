import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss'],
})
export class AddbookComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  public addBookForm = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    categories: new FormControl(),
    volume: new FormControl(),
    year: new FormControl(),
    edition: new FormControl(),
    language: new FormControl(),
    pages: new FormControl(),
    description: new FormControl(),
    available: new FormControl(),
  });

  ngOnInit(): void {}

  submit(): void {
    if (this.addBookForm.valid) {
      this.api.postBook(`/books`, this.addBookForm.value).subscribe(
        (data: any) => {
          this.router.navigate(['/home']);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
