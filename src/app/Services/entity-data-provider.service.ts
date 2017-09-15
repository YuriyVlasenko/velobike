import { Injectable } from '@angular/core';
import CategorieManager from './entityManagers/categories-manager.service';
import Category from '../Model/category';
import { AsyncSubject } from 'rxjs';

@Injectable()
export default class EntityDataProviderService {

  public categoriesTreeSubject = new AsyncSubject();

  constructor(private categoriesManager: CategorieManager) {

    // load list of categories.
    categoriesManager.getAllAsTree()
      .subscribe((categoryItems) => {
        this.categoriesTreeSubject.next(categoryItems);
        this.categoriesTreeSubject.complete();
      });
  }
}
