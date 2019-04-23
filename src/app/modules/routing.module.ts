import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {HomePageComponent} from '../pages/home/home-page.component';
import {LoginPageComponent} from '../pages/login/login-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: '', component: HomePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
