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
  public activatedRoute = new BehaviorSubject([]);

  constructor(
    private categoriesManager: CategorieManager,
    private productManager: ProductManager) {

    // load list of categories.
    this.categoriesManager.getAllAsTree()
      .subscribe((categoryItems) => {
        this.categoriesTree.next(categoryItems);
        this.categoriesTree.complete();
      });

    // load list of all products
    this.productManager.getAll().subscribe((products) => {
      this.products.next(products);
    });

  }

  // TODO: check. try to return only one item.
  findCategory({ friendlyName }): Observable<Category[]> {
    return this.categoriesManager.getAll()
      .map((categories: Category[]) => {

        const result = categories.filter((category: Category) => {
          return category.isMatch({ friendlyName })
        });
        return result;

      });
  }

  findProducts({ categoryId, name }): Observable<Product[]> {

    const localSubject = new AsyncSubject<Product[]>();

    this.products.subscribe((products) => {

      let filteredProducts = products.filter((product: Product) => {
        return product.isMatch({ categoryId }) && product.isContains({ name });
      });

      this.activatedRoute.next(filteredProducts);

      localSubject.next(filteredProducts);
      localSubject.complete();

    });

    return localSubject.asObservable();
  }
}
