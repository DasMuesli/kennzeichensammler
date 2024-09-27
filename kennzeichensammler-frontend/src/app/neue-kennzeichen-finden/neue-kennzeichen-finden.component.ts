import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { KennzeichenSpeicherService } from '../Kennzeichen/kennzeichen-speicher.service';
import { map, Observable, Subscription } from 'rxjs';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-neue-kennzeichen-finden',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './neue-kennzeichen-finden.component.html',
  styleUrl: './neue-kennzeichen-finden.component.scss'
})
export class NeueKennzeichenFindenComponent {

  verfuegbareKennzeichen: Observable<Array<{
    kennzeichen: string,
    farbe: string
  }>>

  constructor(private kennzServ: KennzeichenSpeicherService) {
    this.verfuegbareKennzeichen = kennzServ.nichtGefundeneKennzeichen.pipe(map((kennz) => {
        return kennz.map((val) => {
            return {
                kennzeichen: val.kuerzel,
                farbe: NeueKennzeichenFindenComponent.getFarbeVonKennzeichen(val.kuerzel)
            }
        })
    }));
  }

  private static getFarbeVonKennzeichen(kennzeichen: string) {
    switch(kennzeichen.length) {
      case 1: return 'primary'
      case 2: return 'warn'
      case 3: return 'accent'
      default: return 'error'
    }
  }

  clickOnKennzeichen(bezeichnung: string) {
    this.kennzServ.neuesKennzeichenGefunden(bezeichnung);
  }
}
