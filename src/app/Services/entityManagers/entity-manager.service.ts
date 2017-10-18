import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import httpHelper from '../httpHelper';

const apiPrefix = '/api'

const cachingheaders: Headers = new Headers({
  'Cache-Control': 'max-age=3600, must-revalidate'
});

const preventCachingheaders: Headers = new Headers({
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
});

@Injectable()
export default class EntityManagerService {

  constructor(private http: Http, private apiMethod: String) { }

  getAll(useCache: boolean = false): Observable<any> {
    return httpHelper.processResponse(this.http.get(`${apiPrefix}/${this.apiMethod}`, {
      headers: useCache ? preventCachingheaders : cachingheaders
    }));
  }


  getOne(id: String): Observable<any> {
    return httpHelper.processResponse(this.http.get(`${apiPrefix}/${this.apiMethod}/${id}`, {
      headers: preventCachingheaders
    }));
  }

  createOrUpdate(data: any): Observable<string> {
    return httpHelper.processResponse(this.http.post(`${apiPrefix}/${this.apiMethod}`, data));
  }

  delete(id: string): Observable<boolean> {
    return httpHelper.processResponse(this.http.delete(`${apiPrefix}/${this.apiMethod}/${id}`));
  }
}

