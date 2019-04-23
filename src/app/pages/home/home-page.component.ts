import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FirestoreService} from '../../services/firestore.service';
import {Todo} from '../../models/todo';
import {TodoService} from '../../services/todo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  public userTodos: any = null;
  public defaultTodoType = 'active';

  constructor(
    private authService: AuthService,
    private fs: FirestoreService,
    private todoService: TodoService
  ) {
  }

  ngOnInit() {
    this.loadTodos(this.defaultTodoType);
    this.todoService.loadTodosSubject.subscribe((type: string = null) => {
      this.loadTodos(type);
    });
    this.todoService.dropTodosSubject.subscribe(() => {
      this.userTodos = null;
    });
  }

  private loadTodos(type: string = null) {
    this.fs.getUserTodos(type).then(todos => {
      this.userTodos = this.groupByDate(todos);
    }, error => console.error(error));
  }

  private groupByDate(list: Todo[], desc: boolean = false) {
    const result = {};
    list.map((item: Todo) => {
      let key = 'No date';
      if (item.date) {
        const date = item.date.toDate();
        key = moment(date).format('LL');
      }
      result[key] ? result[key].push(item) : result[key] = [item];
    });
    Object.keys(result).map(key => {
      result[key] = this.sortByTitle(result[key]);
    });
    return result;
  }

  private sortByTitle(list: Todo[], desc: boolean = false) {
    return list.sort((a: Todo, b: Todo) => {
      if (a.title > b.title) {
        return desc ? -1 : 1;
      } else if (a.title < b.title) {
        return desc ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
