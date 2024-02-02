import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-rentlist',
  templateUrl: './rentlist.component.html',
  styleUrls: ['./rentlist.component.scss'],
})
export class RentlistComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = ['Title', 'Renter', 'Rent Date', 'Return Date', 'Rent Status'];

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort:MatSort){
    this.dataSource.sort=sort;
  }


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getBooks('/rentBooks').subscribe(
      (data: any) => {
        data.forEach((doc:any) => {
          Object.assign(doc,{userName:doc.userDetail[0].userName,bookTitle:doc.bookDetail[0].title,});
        });
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: any): void {
    this.dataSource.filter = event.target.value.trim();
  }
}
