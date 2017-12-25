import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import EntityManagerService from './entity-manager.service';
import Order from '../../Model/order';

const mapToEntity = (item) => {
    if (!item) {
        return null;
    }
    return new Order(item.id, item.date, item.customerName, item.customerPhone,
        item.itemIds, item.itemCounts, item.summ, item.city, item.deliveryPoint);
};

@Injectable()
export default class OrderManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'orders');
    }

    getAll(useCache: boolean = false): Observable<Order[]> {
        return super.getAll(useCache).map((items: any[]) => {
            return items.map(mapToEntity);
        });
    }

    getOne(id: string): Observable<Order> {
        return super.getOne(id).map(mapToEntity);
    }
}