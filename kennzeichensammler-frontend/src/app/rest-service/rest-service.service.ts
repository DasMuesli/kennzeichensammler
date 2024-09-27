import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type PathSegments = Array<string>

@Injectable({
  providedIn: 'root'
})
export class RestService {
    private baseUrl = 'http://localhost:8000'

    constructor(private http: HttpClient) { }

    public get<T>(pathSegment: PathSegments, querys?: HttpParams) {
        return <Observable<T>> this.http.get(this.getUrl(pathSegment), {
            params: querys,
        })
        
    }

    public post<T>(pathSegment: PathSegments, querys?: HttpParams, body?: any) {
        return <Observable<T>> this.http.post(this.getUrl(pathSegment), body, {
            params: querys
        })
        
    }

    private getUrl(pathSegment: PathSegments) {
        var url = this.baseUrl;
        pathSegment.forEach((segment) => url += `/${segment}`);
        return url;
    }
}
