import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import ValueType from '../../Model/valueType';

const mapToEntity = (item) => {
    return new ValueType(item.id, item.name, item.validationExpression);
}

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'valueTypes')
    }

    getAll(): Observable<ValueType[]> {
        return super.getAll().map((items: any[]) => {
            return items.map(mapToEntity);
        });
    }

    getOne(id: string): Observable<ValueType> {
        return super.getOne(id).map(mapToEntity);
    }
}