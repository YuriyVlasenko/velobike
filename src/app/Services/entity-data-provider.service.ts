import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';

import CategorieManager from './entityManagers/categories-manager.service';
import ProductManager from './entityManagers/product-manager.service';
import ContactInformationManager from './entityManagers/contact-information.service';

import Category from '../Model/category';
import Product from '../Model/product';
import ContactInformation from '../Model/contactInformation';

@Injectable()
export default class EntityDataProviderService {

  public categoriesTree = new AsyncSubject();
  public categories = new AsyncSubject<Category[]>();
  public products = new AsyncSubject<Product[]>();
  public activatedRoute = new BehaviorSubject([]);
  public contactInformation = new AsyncSubject<ContactInformation[]>();

  constructor(
    private categoriesManager: CategorieManager,
    private productManager: ProductManager,
    private contactInformationManager: ContactInformationManager) {

    this.contactInformationManager.getAll()
      .subscribe((contactInformationItems: ContactInformation[]) => {
        this.contactInformation.next(contactInformationItems);
        this.contactInformation.complete();
      })

    // load list of categories.
    this.categoriesManager.getAll()
      .subscribe((categoryItems: Category[]) => {
        this.categories.next(categoryItems);
        this.categories.complete();
      });

    // load categories tree.
    this.categoriesManager.getAllAsTree()
      .subscribe((categoryItems) => {
        this.categoriesTree.next(categoryItems);
        this.categoriesTree.complete();
      });

    // load list of all products
    this.productManager.getAll().subscribe((products) => {
      this.products.next(products);
      this.products.complete();
    });
  }

  // TODO: check. try to return only one item.
  findCategory({ friendlyName }): Observable<Category[]> {

    return this.categories.map((categories: Category[]) => {
      const result = categories.filter((category: Category) => {
        return category.isMatch({ friendlyName })
      });
      return result;
    });
  }

  findProducts({ categoryId, name, id }): Observable<Product[]> {

    const localSubject = new AsyncSubject<Product[]>();

    this.products.subscribe((productItems) => {

      let filteredProducts = productItems.filter((product: Product) => {
        return product.isMatch({ id, categoryId }) && product.isContains({ name });
      });

      this.activatedRoute.next(filteredProducts);

      localSubject.next(filteredProducts);
      localSubject.complete();

    });

    return localSubject.asObservable();
  }
}
