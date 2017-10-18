import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import Parameter from '../../Model/parameter';

const mapToEntity = (item) => {
    return new Parameter(item.id, item.name, item.valueTypeId, item.description);
}

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'parameters')
    }

    getAll(useCache: boolean = false): Observable<Parameter[]> {
        return super.getAll(useCache).map((items: any[]) => {
            return items.map(mapToEntity);
        });
    }

    getOne(id: string): Observable<Parameter> {
        return super.getOne(id).map(mapToEntity);
    }
}
