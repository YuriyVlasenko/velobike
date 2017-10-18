import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import httpHelper from '../httpHelper';
import SmartCacheService from '../smart-cache.service';

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

  private smartCache: SmartCacheService;

  constructor(private http: Http, private apiMethod: string) {
    this.smartCache = new SmartCacheService();
  }

  getAll(useCache: boolean = false): Observable<any> {

    console.log('getAll' + this.apiMethod + useCache);

    const dataLoader = (fromCache) => {
      return httpHelper.processResponse(this.http.get(`${apiPrefix}/${this.apiMethod}`, {
        headers: preventCachingheaders
      }));
    }

    if (useCache) {
      if (!this.smartCache.get(this.apiMethod)) {
        this.smartCache.set(this.apiMethod, dataLoader);
      }
      return this.smartCache.get(this.apiMethod);
    }

    return dataLoader(useCache);
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

