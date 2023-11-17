import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CreateTodoDialogComponent } from './components/create-todo-dialog/create-todo-dialog.component';
import { HttpService } from './service/http.service';

export interface PeriodicElement {
  title: string;
  discription: number;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'todo-frontend';
  displayedColumns: string[] = ['title', 'discription', 'status', 'action'];
  dataSource = new MatTableDataSource([]);

  constructor(private matDialog: MatDialog, private httpService: HttpService){}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.httpService.getTodoList().subscribe(
      (res: any) => {
        if(res) {
          this.dataSource = new MatTableDataSource(res)
        }
      }, err => {
        alert(err.message);
      }
    )
  }

  openCreateDialog() {
    this.matDialog.open(CreateTodoDialogComponent , {
      width: '400px'
    }).afterClosed().subscribe(
      res => {
        this.getTodoList();
      }
    );
  }

  deleteRow(ele: any) {
    console.log('ele', ele)
    this.httpService.deleteRow(ele._id).subscribe(
      res => {
        if(res) {
          alert('Record deleted')
          this.getTodoList();
        }
      }
    )
  }

  onChange(event: any) {
    console.log('event', event)
    this.httpService.getAllListByStatus(event.value).subscribe(
      (res: any) => {
        if(res) {
          this.dataSource = new MatTableDataSource(res)
        }
      }, err => {
        alert(err.message);
      }
    )
  }
}
