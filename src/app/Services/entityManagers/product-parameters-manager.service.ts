import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import ProductParameter from '../../Model/productParameter';

const mapToEntity = (item) => {
    return new ProductParameter(item.id, item.productId, item.parameterId, item.value);
}

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'productParameters')
    }

    getAll(): Observable<ProductParameter[]> {
        return super.getAll().map((items: any[]) => {
            return items.map(mapToEntity);
        });
    }

    getOne(id: string): Observable<ProductParameter> {
        return super.getOne(id).map(mapToEntity);
    }
}