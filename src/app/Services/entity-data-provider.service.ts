import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';

import CategorieManager from './entityManagers/categories-manager.service';
import ProductManager from './entityManagers/product-manager.service';
import Category from '../Model/category';
import Product from '../Model/product';

@Injectable()
export default class EntityDataProviderService {

  public categoriesTree = new AsyncSubject();
  public products = new BehaviorSubject([]);
  public displayedProducts = new BehaviorSubject([]);

  constructor(private categoriesManager: CategorieManager,
    private productManager: ProductManager) {

    // load list of categories.
    categoriesManager.getAllAsTree()
      .subscribe((categoryItems) => {
        this.categoriesTree.next(categoryItems);
        this.categoriesTree.complete();
      });

    // load list of all products
    productManager.getAll().subscribe((products) => {
      this.products.next(products);
    });

  }

  findProducts({ categoryId, name }): Observable<Product[]> {

    const localSubject = new AsyncSubject<Product[]>();

    this.products.subscribe((products) => {

      let filteredProducts = products.filter((product: Product) => {
        return product.isMatch({ categoryId }) && product.isContains({ name });
      });

      this.displayedProducts.next(filteredProducts);

      localSubject.next(filteredProducts);
      localSubject.complete();

    });

    return localSubject.asObservable();
  }
}
