import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import httpHelper from '../httpHelper';

const apiPrefix = '/api'


@Injectable()
export default class EntityManagerService {

  constructor(private http: Http, private apiMethod: String) { }

  getAll(): Observable<any> {
    return httpHelper.processResponse(this.http.get(`${apiPrefix}/${this.apiMethod}`));
  }


  getOne(id: String): Observable<any> {
    return httpHelper.processResponse(this.http.get(`${apiPrefix}/${this.apiMethod}/${id}`));
  }

  update(data: any): Observable<boolean> {
    return httpHelper.processResponse(this.http.post(`${apiPrefix}/${this.apiMethod}/${data.id}`, data));
  }

  delete(id: string): Observable<boolean> {
    return httpHelper.processResponse(this.http.delete(`${apiPrefix}/${this.apiMethod}/${id}`));
  }

}

