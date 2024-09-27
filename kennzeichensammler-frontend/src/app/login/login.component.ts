import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RestService } from '../rest-service/rest-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    public form = new FormGroup({
        benutzername: new FormControl('', {nonNullable: true}),
        passwort: new FormControl('', {nonNullable: true})
    })

    @Input({required: true}) mode: 'login' | 'register' = 'login'

    constructor(
        private restServ: RestService,
        private userServ: UserService
    ) {}

    onLogin() {
        const data = this.form.getRawValue();
        this.userServ[this.mode](data);
    }

}
