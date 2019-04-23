import {Component} from '@angular/core';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html'
})
export class SocialLoginComponent {

  faGoogle = faGoogle;

  constructor(public auth: AuthService) {
  }
}
