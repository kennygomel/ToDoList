import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {firestore} from 'firebase';
import {Todo} from '../../models/todo';
import {FirestoreService} from '../../services/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-todo',
  templateUrl: './edit-todo-dialog.component.html'
})
export class EditTodoDialogComponent implements OnInit {

  public now = new Date();
  public date = null;

  private titleValidatiors = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100)
  ];
  private descriptionValidatiors = [
    Validators.maxLength(500)
  ];
  public todoForm: FormGroup = new FormGroup({
    title: new FormControl('', this.titleValidatiors),
    description: new FormControl('', this.descriptionValidatiors),
    date: new FormControl(''),
    done: new FormControl(false),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private firestoreService: FirestoreService,
    private dialogRef: MatDialogRef<EditTodoDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.date = this.todo && this.todo.date ? this.todo.date.toDate() : null;
    if (this.todo) {
      this.todoForm = new FormGroup({
        title: new FormControl(this.todo.title, this.titleValidatiors),
        description: new FormControl(this.todo.description, this.descriptionValidatiors),
        date: new FormControl(this.todo.date.toDate()),
        done: new FormControl(this.todo.done),
      });
    }
  }

  public saveTodo() {
    if (!this.todoForm.valid) {
      return;
    }
    const data = this.todoForm.value;
    const todo = new Todo(
      data.title,
      data.description,
      data.done,
      data.date ? firestore.Timestamp.fromDate(data.date) : null
    );
    todo.id = this.todo ? this.todo.id : null;
    this.firestoreService.saveTodo(todo).then(
      () => {
        this.dialogRef.close(todo);
      },
      error => console.error(error)
    );
  }
}
