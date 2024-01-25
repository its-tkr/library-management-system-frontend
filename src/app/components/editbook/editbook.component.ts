import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.scss'],
})
export class EditbookComponent implements OnInit {
  public book!: any;
  public editForm = new FormGroup({
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
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api
      .getBooks(`/books/${this.route.snapshot.paramMap.get('id')}`)
      .subscribe(
        (data: any) => {
          this.book = data;
          this.editForm.setValue({
            title: this.book.title,
            author: this.book.author,
            categories: this.book.categories,
            volume: this.book.volume,
            year: this.book.year,
            language: this.book.language,
            pages: this.book.pages,
            description: this.book.description,
            available: this.book.available,
            edition: this.book.edition,
          });
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  submit(): void {
    if (this.editForm.valid) {
      this.api.putBook(`/books/${this.book._id}`, this.editForm.value).subscribe(
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
