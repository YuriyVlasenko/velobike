import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import Product from '../../Model/product';

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'products')
    }

    getAll(): Observable<Product[]> {
        return super.getAll().map((items: any[]) => {
            return items.map((item) => {
                return new Product(item.id, item.name, item.categoryId, item.description,
                    item.price, item.order);
            });
        });
    }

    getOne(id: string): Observable<Product> {
        return super.getOne(id).map((item) => {
            return new Product(item.id, item.name, item.categoryId, item.description,
                item.price, item.order);
        });
    }

}
