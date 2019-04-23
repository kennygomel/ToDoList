import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {TodoService} from '../../services/todo.service';
import {FirestoreService} from '../../services/firestore.service';
import * as moment from 'moment';
import {ViewTodoDialogComponent} from '../../dialogs/view-todo/view-todo-dialog.component';
import {MatDialog} from '@angular/material';
import {EditTodoDialogComponent} from '../../dialogs/edit-todo/edit-todo-dialog.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  @Input() todos: any = null;
  @Input() defaultType: string = null;
  public objectKeys = Object.keys;
  public todoType = null;
  public today = moment().format('LL');

  constructor(
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    public todoService: TodoService
  ) {
  }

  ngOnInit(): void {
    this.todoType = this.defaultType;
  }

  public editTodo(todo: Todo = null) {
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

  public updateTodo(todo: Todo) {
    this.firestoreService.saveTodo(todo).then(() => {
      this.todoService.loadTodos(this.todoType);
    }, error => console.error(error));

  }

  public viewTodo(todo: Todo) {
    this.dialog.open(ViewTodoDialogComponent, {
      data: todo
    });
  }
}
