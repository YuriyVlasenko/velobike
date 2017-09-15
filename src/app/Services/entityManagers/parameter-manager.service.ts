import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import Parameter from '../../Model/parameter';

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'parameters')
    }

    getAll(): Observable<Parameter[]> {
        return super.getAll().map((items: any[]) => {
            return items.map((item) => {
                return new Parameter(item.id, item.name, item.valueTypeId, item.description);
            });
        });
    }

    getOne(id: string): Observable<Parameter> {
        return super.getOne(id).map((item) => {
            return new Parameter(item.id, item.name, item.valueTypeId, item.description);
        });
    }

}
