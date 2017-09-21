import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import Product from '../../Model/product';

const mapToEntity = (item)=> {
    return new Product(item.id, item.name, item.categoryId, item.description,
        item.price, item.order);
}

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'products')
    }

    getAll(): Observable<Product[]> {
        return super.getAll().map((items: any[]) => {
            return items.map(mapToEntity);
        });
    }

    getOne(id: string): Observable<Product> {
        return super.getOne(id).map(mapToEntity);
    }

}
