import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import EntityManagerService from './entity-manager.service';
import Category from '../../Model/category';
import CategoryTreeNode from '../../Model/categoryTreeNode';

const assignChildItems = (processedItem: Category, allItems: Category[]) => {

  const subCategories = allItems.filter((item) => {
    return item.parentId === processedItem.id;
  });

  processedItem.subCategories = subCategories;

  subCategories.forEach((subCategory) => {
    assignChildItems(subCategory, allItems);
  });
}

@Injectable()
export default class CategoriesManagerService extends EntityManagerService {

  constructor(http: Http) {
    super(http, 'categories');
  }



  getAll(): Observable<Category[]> {
    return super.getAll().map((items: any[]) => {
      return items.map((item) => {
        return new Category(item.id, item.name, item.parentId, item.order);
      });
    });
  }

  getOne(id: string): Observable<Category> {
    return super.getOne(id).map((item) => {
      return new Category(item.id, item.name, item.parentId, item.order);
    });
  }

  getAllAsTree(): Observable<CategoryTreeNode[]> {

    return this.getAll().map((items:Category[]) => {

      const nodeItems = items.map((item) => new CategoryTreeNode(item));

      const rootItems = nodeItems.filter((item) => !item.parentId || item.parentId === '0');

      rootItems.forEach((rootItem) => {
        assignChildItems(rootItem, nodeItems);
      })

      return rootItems;
    });
  }
}
