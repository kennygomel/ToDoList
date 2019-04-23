import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Progress} from '../models/progress';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  public progressSubject = new Subject();

  public start() {
    this.progressSubject.next(<Progress>{active: true});
  }

  public stop() {
    this.progressSubject.next(<Progress>{active: false});
  }
}
