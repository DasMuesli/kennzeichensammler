import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share, switchMap } from 'rxjs';
import { RestService } from '../rest-service/rest-service.service';
import { HttpParams } from '@angular/common/http';
import { GefundenesKennzeichen, Kennzeichen } from '../../models';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class KennzeichenSpeicherService {

  public readonly gefundeneKennzeichen: Observable<Array<GefundenesKennzeichen>>
  public readonly nichtGefundeneKennzeichen: Observable<Array<Kennzeichen>>

  constructor(
    private restServ: RestService,
    private userServ: UserService
  ) {
    this.gefundeneKennzeichen = this.getGefundeneKennzeichen();
    this.nichtGefundeneKennzeichen = this.getNichtGefundeneKennzeichen();
  }

  private getGefundeneKennzeichen() {
    return this.userServ.user.pipe(switchMap((user) => {
        const query = new HttpParams({fromObject: {
            'user': user
        }});
        return this.restServ.get<Array<GefundenesKennzeichen>>(['kennzeichen', 'gefunden.php'], query)
    }))
  }

  private getNichtGefundeneKennzeichen() {
    return this.userServ.user.pipe(switchMap((user) => {
        const query = new HttpParams({fromObject: {
            'user': user
        }});
        return this.restServ.get<Array<Kennzeichen>>(['kennzeichen', 'nichtGefunden.php'], query)
    }))
  }

  neuesKennzeichenGefunden(bezeichung: string) {
    const query = new HttpParams({fromObject: {
        user: this.userServ.aktuellerUser,
        kennzeichen: bezeichung
    }});
    this.restServ.post(['kennzeichen', 'neuGefunden.php'], query).subscribe({
        error: (err) => console.error(err) 
    });
  }
}
