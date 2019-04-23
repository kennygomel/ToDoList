import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Todo} from '../../models/todo';
import * as moment from 'moment';
import {TodoService} from '../../services/todo.service';
import {EditTodoDialogComponent} from '../edit-todo/edit-todo-dialog.component';
import {FirestoreService} from '../../services/firestore.service';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo-dialog.component.html'
})
export class ViewTodoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    private todoService: TodoService
  ) {
  }

  public formatDate(date) {
    return moment(date).format('LL');
  }

  public editTodo(todo: Todo) {
    this.dialog.open(EditTodoDialogComponent, {
      data: todo
    }).afterClosed().subscribe(result => {
      if (result) {
        this.todoService.loadTodos();
      }
    });
  }

  public deleteTodo(todo: Todo) {
    this.firestoreService.deleteTodo(todo).then(
      () => this.todoService.loadTodos(),
      error => console.error(error)
    );
  }
}
