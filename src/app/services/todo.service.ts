import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public dropTodosSubject = new Subject<void>();
  public loadTodosSubject = new Subject<string>();
  private lastType = null;

  public loadTodos(type: string = null) {
    if (type) {
      this.lastType = type;
    }
    this.loadTodosSubject.next(type || this.lastType);
  }
}
