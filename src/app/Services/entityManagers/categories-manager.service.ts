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

const mapToEntity = (item) => {
  if (item) {
    return new Category(item.id, item.name, item.parentId, item.friendlyName, item.order);
  }
  return null;
}

@Injectable()
export default class CategoriesManagerService extends EntityManagerService {

  constructor(http: Http) {
    super(http, 'categories');
  }

  getAll(useCache: boolean = false): Observable<Category[]> {

    return super.getAll(useCache).map((items: any[]) => {
      return items
        .map(mapToEntity)
        .sort((categoryA: Category, categoryB: Category) => {
          if (categoryA.order === categoryB.order) return 0;
          if (categoryA.order > categoryB.order) return 1;
          return -1;
        });
    });
  }

  getOne(id: string): Observable<Category> {
    return super.getOne(id).map(mapToEntity);
  }

  getAllAsTree(): Observable<CategoryTreeNode[]> {

    return this.getAll().map((items: Category[]) => {

      const nodeItems = items.map((item) => new CategoryTreeNode(item));

      const rootItems = nodeItems.filter((item) => !item.parentId || item.parentId === '0');

      rootItems.forEach((rootItem) => {
        assignChildItems(rootItem, nodeItems);
      })

      return rootItems;
    });
  }
}
