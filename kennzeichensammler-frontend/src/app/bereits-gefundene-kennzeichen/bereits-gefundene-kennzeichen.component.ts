import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { KennzeichenSpeicherService } from '../Kennzeichen/kennzeichen-speicher.service';
import { Observable, Subscription } from 'rxjs';
import { GefundenesKennzeichen } from '../../models';


@Component({
  selector: 'app-bereits-gefundene-kennzeichen',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule
  ],
  templateUrl: './bereits-gefundene-kennzeichen.component.html',
  styleUrl: './bereits-gefundene-kennzeichen.component.scss'
})
export class BereitsGefundeneKennzeichenComponent {

  gefundeneKennzeichen: Observable< Array<GefundenesKennzeichen>>

  constructor(kennzServ: KennzeichenSpeicherService) {
    this.gefundeneKennzeichen = kennzServ.gefundeneKennzeichen;
  }
}
