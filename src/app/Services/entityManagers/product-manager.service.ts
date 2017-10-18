import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import Product from '../../Model/product';

const mapToEntity = (item) => {
    return new Product(item.id, item.name, item.categoryId, item.description,
        item.price, item.order, item.priceUSD, item.newPriceUSD, item.imageUrl, item.isActive);
}

@Injectable()
export default class ParameterManagerService extends EntityManagerService {

    constructor(http: Http) {
        super(http, 'products')
    }

    getAll(useCache: boolean = false): Observable<Product[]> {
        return super.getAll(useCache).map((items: any[]) => {
            return items.map(mapToEntity).sort((productA: Product, productB: Product) => {
                if (productA.order === productB.order) return 0;
                if (productA.order > productB.order) return 1;
                return -1;
            });
        });
    }

    getOne(id: string): Observable<Product> {
        return super.getOne(id).map(mapToEntity);
    }

}
