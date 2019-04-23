import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Todo} from '../models/todo';
import {firestore} from 'firebase';
import {AuthService} from './auth.service';
import {ProgressService} from './progress.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private todosStore = this.fs.collection('todos');
  private lastType: string = null;

  constructor(
    private authService: AuthService,
    private fs: AngularFirestore,
    private progress: ProgressService
  ) {
  }

  public getUserTodos(type: string = null): Promise<Todo[]> {
    if (type) {
      this.lastType = type;
    }
    this.progress.start();
    return new Promise((resolve, reject) => {
      this.todosStore.ref.where('userEmail', '==', this.authService.currentUser.email).get().then(
        documentSnapshots => {
          const todos: Todo[] = [];
          const result: any = [];
          documentSnapshots.docs.map(document => {
            const data = document.data();
            data['id'] = document.id;
            result.push(JSON.parse(JSON.stringify(data)));
          });
          result.map(el => {
            if (this.lastType === 'all' || (this.lastType === 'active' && !el.done) || (this.lastType === 'done' && el.done)) {
              const todo = new Todo(
                el.title,
                el.description,
                el.done,
                el.date ? new firestore.Timestamp(el.date.seconds, el.date.nanoseconds) : null,
                el.place
              );
              todo.id = el.id;
              todos.push(todo);
            }
          });
          this.progress.stop();
          resolve(todos);
        }, err => {
          this.progress.stop();
          reject(err);
        });
    });
  }

  public saveTodo(todo: Todo): Promise<any> {
    this.progress.start();
    return new Promise((resolve, reject) => {
      if (todo.userEmail) {
        this.updateOrAddTodo(todo).then(
          () => {
            this.progress.stop();
            resolve();
          },
          error => {
            this.progress.stop();
            reject(error);
          }
        );
      } else {
        todo.userEmail = this.authService.currentUser.email;
        this.updateOrAddTodo(todo).then(
          () => {
            this.progress.stop();
            resolve();
          },
          error => {
            this.progress.stop();
            reject(error);
          }
        );
      }
    });
  }

  public deleteTodo(todo: Todo): Promise<any> {
    return new Promise((resolve, reject) => {
      this.todosStore.doc(todo.id).delete().then(
        () => {
          this.progress.stop();
          resolve();
        },
        error => {
          this.progress.stop();
          reject(error);
        }
      );
    });
  }

  private updateOrAddTodo(todo: Todo): Promise<any> {
    this.progress.start();
    return new Promise((resolve, reject) => {
      if (todo.id) {
        this.todosStore.doc(todo.id).update(todo.asObject).then(
          () => {
            this.progress.stop();
            resolve();
          },
          error => {
            this.progress.stop();
            reject(error);
          }
        );
      } else {
        this.todosStore.add(todo.asObject).then(
          () => {
            this.progress.stop();
            resolve();
          },
          error => {
            this.progress.stop();
            reject(error);
          }
        );
      }
    });
  }
}
