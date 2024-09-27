import { Injectable } from '@angular/core';
import { LoginModel } from '../models';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { P } from '@angular/cdk/keycodes';
import { RestService } from './rest-service/rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    /** Aktueller Benutzer oder Leerstring */
    public readonly user: Observable<string>

    public get aktuellerUser() {
        return this._user.value;
    }

    private _user = new BehaviorSubject("")

    constructor(
        private restServ: RestService
    ) { 
        this.user = this._user.asObservable();
    }

    login(data: LoginModel) {
        return this.loginOrRegister(data, 'login');
    }

    register(data: LoginModel) {
        return this.loginOrRegister(data, 'register');
    }

    private loginOrRegister(data: LoginModel, mode: 'login' | 'register') {
        this.restServ.post<boolean>(['user', `${mode}.php`], undefined, data).subscribe({
            next: (val) => {
                if (true === val) {
                    this._user.next(data.benutzername);
                }
                else {
                    this._user.next("");
                    console.log(`Benutzernameldung: ${val}`);
                }
            },
            error: (err) => {
                this._user.next("");
                console.error(`Benutzernameldung: ${err}`);
            }
        })
    }
}
