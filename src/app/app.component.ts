import {Component, OnDestroy} from '@angular/core';
import {TodoService} from './services/todo.service';
import {ProgressService} from './services/progress.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Progress} from './models/progress';
import {EditTodoDialogComponent} from './dialogs/edit-todo/edit-todo-dialog.component';
import {MatDialog} from '@angular/material';
import {Todo} from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public progress: Progress = {active: false};
  private onDestroy$ = new Subject();

  constructor(
    private dialog: MatDialog,
    private progressService: ProgressService,
    private todoService: TodoService
  ) {
    this.progressService.progressSubject.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (progress: Progress) => {
        setTimeout(() => {
          this.progress = progress;
        }, 0);
      }, error => {
        this.progress = {active: false};
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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
}
