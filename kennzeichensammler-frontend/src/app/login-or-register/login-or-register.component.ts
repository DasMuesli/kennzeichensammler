import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.scss'
})
export class LoginOrRegisterComponent {

}
