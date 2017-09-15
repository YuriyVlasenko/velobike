import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

import IServerResponse from '../../Model/serverResponse'

const apiPrefix = '/api';

const manageResponse = (response: Observable<any>) => {
  return response
    .map((res: Response) => res.json())     // convert data to JSON
    .map((res: IServerResponse) => {        // check response data
      if (!res.isOk) {
        return Observable.throw(res.error);
      }
      return res.data;
    })
    .catch((error: any) => {                //  handle error
      return Observable.throw(error.json().error)
    });
}

@Injectable()
export default class EntityManagerService {

  constructor(private http: Http, private apiMethod: String) { }

  getAll(): Observable<any> {
    return manageResponse(this.http.get(`${apiPrefix}/${this.apiMethod}`));
  }


  getOne(id: String): Observable<any> {
    return manageResponse(this.http.get(`${apiPrefix}/${this.apiMethod}/${id}`));
  }

  update(data: any): Observable<boolean> {
    return manageResponse(this.http.post(`${apiPrefix}/${this.apiMethod}/${data.id}`, data));
  }

  delete(id: string): Observable<boolean> {
    return manageResponse(this.http.delete(`${apiPrefix}/${this.apiMethod}/${id}`));
  }

}

