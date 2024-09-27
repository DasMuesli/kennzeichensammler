import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { routes } from './app.routes';
import { RestService } from './rest-service/rest-service.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kennzeichensammler';

  public menueItems = routes;

  public user: Observable<string>

  constructor(
    private router: Router,
    userServ: UserService
  ) {
    this.user = userServ.user
  }

  navigiereZu(url: string) {
    this.router.navigateByUrl(url)
  }
}
