import {firestore} from 'firebase';

export class Todo {
  id: string;
  userEmail: string;
  title: string;
  description: string;
  done: boolean;
  date: firestore.Timestamp;
  place: firestore.GeoPoint;

  constructor(title, description = null, done = false, date: firebase.firestore.Timestamp = null, place = null) {
    this.title = title;
    this.description = description;
    this.done = done;
    this.date = date;
    this.place = place;
  }

  get isNew() {
    return !!this.id;
  }

  get asObject() {
    const object = JSON.parse(JSON.stringify(this));
    object.date = this.date;
    return object;
  }

  get clone() {
    const clone = new Todo(this.title, this.description, this.done, this.date, this.place);
    clone.id = this.id;
    return clone;
  }
}
