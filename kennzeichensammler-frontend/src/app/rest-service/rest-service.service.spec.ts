import { TestBed } from '@angular/core/testing';

import { RestService } from './rest-service.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { Provider } from '@angular/core';

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj<HttpClient>(['get', 'post'])
    spy.get.and.returnValue(of(123));
    spy.post.and.returnValue(of('abc'));

    TestBed.configureTestingModule({
        providers: [
            <Provider> {
                provide: HttpClient,
                useValue: spy
            }
        ]
    });
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('soll get richtig ausführen', () => {
    return expectAsync(firstValueFrom(service.get([]))).toBeResolvedTo(123);
  })

  it('soll post richtig ausfuhren', () => {
    return expectAsync(firstValueFrom(service.post([]))).toBeResolvedTo('abc');
  })
});
