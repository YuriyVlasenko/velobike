import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import ProductImage from '../../Model/productImage';

const mapToEntity = (item) => {
  return new ProductImage(item.id, item.productId, item.url, item.width, item.height);
}

@Injectable()
export default class ProductImagesManagerService extends EntityManagerService {

  constructor(http: Http) {
    super(http, 'productImages')
  }

  getAll(useCache: boolean = false): Observable<ProductImage[]> {
    return super.getAll(useCache).map((items: any[]) => {
      return items.map(mapToEntity);
    });
  }

  getOne(id: string): Observable<ProductImage> {
    return super.getOne(id).map(mapToEntity);
  }

}
