import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.scss']
})
export class CreateTodoDialogComponent {

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    discription: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  })

  constructor(private httpService: HttpService, private matDialogRef: MatDialogRef<CreateTodoDialogComponent>){}

  onSave() {
    this.httpService.save(this.form.value).subscribe(
      res => {
        if(res) {
          alert('Data saved');
          this.matDialogRef.close();
        }
      }, err => {
        alert(err.message);
      });
  }

  cancel() {
    this.matDialogRef.close();
  }

}
