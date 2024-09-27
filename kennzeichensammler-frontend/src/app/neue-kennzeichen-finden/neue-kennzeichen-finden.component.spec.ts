import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeueKennzeichenFindenComponent } from './neue-kennzeichen-finden.component';
import { KennzeichenSpeicherService } from '../Kennzeichen/kennzeichen-speicher.service';
import { BehaviorSubject } from 'rxjs';
import { Kennzeichen } from '../../models';
import { Provider } from '@angular/core';

describe('NeueKennzeichenFindenComponent', () => {
  let component: NeueKennzeichenFindenComponent;
  let fixture: ComponentFixture<NeueKennzeichenFindenComponent>;
  let spy: jasmine.SpyObj<KennzeichenSpeicherService>

  beforeEach(async () => {
    const kennzeichen = ['HN', 'S', 'B', 'KB'].map((val) => <Kennzeichen> {kuerzel: val})

    spy = jasmine.createSpyObj<KennzeichenSpeicherService>(['neuesKennzeichenGefunden'], {
        nichtGefundeneKennzeichen: new BehaviorSubject(kennzeichen)
    })
    spy.neuesKennzeichenGefunden.and.returnValue();

    await TestBed.configureTestingModule({
      imports: [NeueKennzeichenFindenComponent],
      providers: [
        <Provider> {
            provide: KennzeichenSpeicherService,
            useValue: spy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeueKennzeichenFindenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('soll neues Kennzeichen gefunden auslösen', () => {
    component.clickOnKennzeichen('kw');
    expect(spy.neuesKennzeichenGefunden.calls.count()).toBe(1);
    expect(spy.neuesKennzeichenGefunden.calls.mostRecent().args[0]).toBe('kw');
  })
});
