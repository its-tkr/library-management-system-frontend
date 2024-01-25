import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rentlist',
  templateUrl: './rentlist.component.html',
  styleUrls: ['./rentlist.component.scss'],
})
export class RentlistComponent implements OnInit {
  public rentList: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getBooks('/rentBooks').subscribe(
      (data: any) => {
        console.log(data);
        this.rentList = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
