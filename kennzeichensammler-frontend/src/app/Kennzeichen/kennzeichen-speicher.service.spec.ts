import { TestBed } from '@angular/core/testing';

import { KennzeichenSpeicherService } from './kennzeichen-speicher.service';
import { RestService } from '../rest-service/rest-service.service';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { Provider } from '@angular/core';
import { GefundenesKennzeichen, Kennzeichen } from '../../models';
import { UserService } from '../user.service';

describe('KennzeichenSpeicherService', () => {
    let service: KennzeichenSpeicherService;
    let kennzeichen: Array<Kennzeichen>;
    let kennzeichenGefunden: Array<GefundenesKennzeichen>

    function kennzeichenFunk<T>(path: Array<string>) {
        const strPath = JSON.stringify(path);
        switch (strPath) {
            case JSON.stringify(['nichtGefundeneKennzeichen']): return of<T>(<any> kennzeichen); 
            case JSON.stringify(['gefundeneKennzeichen']): return of<T>(<any> kennzeichenGefunden);
            default: throw new Error()
        }
    }

    beforeEach(() => {
        const kuerzel = ['HN', 'S', 'B', 'KB'];
        kennzeichen = kuerzel.map((val) => <Kennzeichen> {kuerzel: val})
        kennzeichenGefunden = kuerzel.map((val) => <GefundenesKennzeichen> {kuerzel: val, zeitpunktDesFindens: new Date()})

        const restServSpy = jasmine.createSpyObj<RestService>(['get', 'post']);
        restServSpy.get.and.callFake(kennzeichenFunk);
        restServSpy.post.and.returnValue(of(true));

        const spy = new UserService(restServSpy);
        spyOnProperty(spy, 'user','get').and.returnValue(new BehaviorSubject('KK'));

        TestBed.configureTestingModule({
            providers: [
                <Provider> {
                    provide: RestService,
                    useValue: spy
                }
            ]
        });
        service = TestBed.inject(KennzeichenSpeicherService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('soll nicht gefundene Kennzeichen richtig zurückgeben', (done) => {
        service.nichtGefundeneKennzeichen.subscribe((val) => {
            if (val.length > 0) {
                expect(val).toEqual(kennzeichen);
                done();
            }
        })
    })

    it('soll gefundene Kennzeichen richtig zurückgeben', (done) => {
        service.gefundeneKennzeichen.subscribe((val) => {
            if (val.length > 0) {
                expect(val).toEqual(kennzeichenGefunden);
                done();
            }
        })
    })
});
