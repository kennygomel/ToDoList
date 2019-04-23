import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: User | null = this.getUserFromStorage();

  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe(state => {
      this.authState = state;
      this.setUserToStorage(state);
      if (this.authState) {
        this.router.navigate(['/']);
      }
    });
  }

  get currentUser(): User | null {
    return this.authState;
  }

  public facebookLogin(): void {
    this.socialSignIn(new auth.FacebookAuthProvider());
  }

  public googleLogin(): void {
    this.socialSignIn(new auth.GoogleAuthProvider());
  }

  public signOut(): void {
    this.af.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private setUserToStorage(user: User | null): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  private socialSignIn(provider: auth.AuthProvider): void {
    this.af.auth.signInWithPopup(provider);
  }

}
