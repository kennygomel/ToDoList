import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {RoutingModule} from './modules/routing.module';
import {MaterialModule} from './modules/material.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './pages/login/login-page.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AuthGuard} from './guards/auth.guard';
import {HomePageComponent} from './pages/home/home-page.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SocialLoginComponent} from './components/social-login/social-login.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';
import {EditTodoDialogComponent} from './dialogs/edit-todo/edit-todo-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material';
import {ViewTodoDialogComponent} from './dialogs/view-todo/view-todo-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    SidenavComponent,
    SocialLoginComponent,
    TodosListComponent,
    ProgressSpinnerComponent,
    EditTodoDialogComponent,
    ViewTodoDialogComponent
  ],
  entryComponents: [
    EditTodoDialogComponent,
    ViewTodoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RoutingModule,
    MaterialModule,
    FontAwesomeModule,
    MatButtonToggleModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
