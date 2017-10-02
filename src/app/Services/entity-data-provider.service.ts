import { Injectable, EventEmitter } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';

import CategorieManager from './entityManagers/categories-manager.service';
import ProductManager from './entityManagers/product-manager.service';
import ProductParameterManager from './entityManagers/product-parameters-manager.service';
import ContactInformationManager from './entityManagers/contact-information.service';
import ValueTypeManager from './entityManagers/value-type-manager.service';
import ParameterManager from './entityManagers/parameter-manager.service';
import UserManager from './entityManagers/users-manager.service';
import EntityManager from './entityManagers/entity-manager.service';
import ProductImageManager from './entityManagers/product-images-manager.service';

import Parameter from '../Model/parameter';
import ValueType from '../Model/valueType';
import ProductParameter from '../Model/productParameter';
import Category from '../Model/category';
import Product from '../Model/product';
import ProductImage from '../Model/productImage';
import ContactInformation from '../Model/contactInformation';
import IEntity from './../Model/IEntity';

import entityTypes from '../Services/entity-types';

@Injectable()
export default class EntityDataProviderService {

  private valueTypes = new AsyncSubject();
  public parameters = new AsyncSubject();
  public productParameters = new AsyncSubject();
  public productImages = new AsyncSubject();
  public categoriesTree = new AsyncSubject();
  public categories = new AsyncSubject<Category[]>();
  public products = new AsyncSubject<Product[]>();
  public activatedRoute = new BehaviorSubject([]);
  public contactInformation = new AsyncSubject<ContactInformation[]>();

  constructor(
    private categoriesManager: CategorieManager,
    private productManager: ProductManager,
    private contactInformationManager: ContactInformationManager,
    private productParameterManager: ProductParameterManager,
    private valueTypeManager: ValueTypeManager,
    private parameterManager: ParameterManager,
    private userManager: UserManager,
    private productImageManager: ProductImageManager) {

    //productImages
    this.productImageManager.getAll()
      .subscribe((productImages) => {
        this.productImages.next(productImages);
        this.productImages.complete();
      });

    // Load valuetypes
    this.valueTypeManager.getAll()
      .subscribe((valueTypes) => {
        this.valueTypes.next(valueTypes);
        this.valueTypes.complete();
      });

    // Load parameters
    this.parameterManager.getAll()
      .switchMap((parameters) => {
        return this.valueTypes.map((valueTypeItems: ValueType[]) => {

          parameters.forEach((parameter) => {
            parameter.valueType = valueTypeItems.find((valueTypeItem) => valueTypeItem.id === parameter.valueTypeId);
          })

          return parameters;
        });
      })
      .subscribe((parameters) => {
        this.parameters.next(parameters);
        this.parameters.complete();
      });

    // Load productParameters
    this.productParameterManager.getAll()
      .switchMap((productParameterItems) => {

        return this.parameters.map((parameterItems: Parameter[]) => {

          productParameterItems.forEach((productParameterItem) => {
            productParameterItem.parameter = parameterItems.find((parameterItem) => parameterItem.id === productParameterItem.parameterId);
          });

          return productParameterItems;
        });

      })
      .subscribe((productParameterItems) => {
        this.productParameters.next(productParameterItems);
        this.productParameters.complete();
      });

    contactInformationManager.getAll()
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
    this.productManager.getAll()
      .switchMap((products) => {

        return this.productParameters.map((productParameterItems: ProductParameter[]) => {

          // Add parameters to products
          products.forEach((productItem: Product) => {
            productItem.parameters = productParameterItems.filter((productParameterItem) => {
              return productParameterItem.productId === productItem.id
            })
          })

          return products;
        })

      })
      .subscribe((products) => {
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

  deleteEntity(entityType: string, entityId: string) {
    const entityManager = this._getEntityManagerService(entityType);
    return entityManager.delete(entityId);
  }

  createOrUpdateEntity(entityType: string, entityData: any): Observable<boolean> {
    const entityManager = this._getEntityManagerService(entityType);
    return entityManager.createOrUpdate(entityData);
  }

  getEntity(entityType: string, entityId: string): Observable<any> {
    return this._getEntityManagerService(entityType).getOne(entityId);
  }

  getEntities(entityType: string): Observable<IEntity[]> {
    return this._getEntityManagerService(entityType).getAll();
  }

  _getEntityManagerService(entityType: string): EntityManager {
    switch (entityType) {
      case entityTypes.CATEGORIES.Name: {
        return this.categoriesManager;
      }
      case entityTypes.PARAMETERS.Name: {
        return this.parameterManager;
      }
      case entityTypes.VALUE_TYPES.Name: {
        return this.valueTypeManager;
      }
      case entityTypes.PRODUCTS.Name: {
        return this.productManager;
      }
      case entityTypes.USERS.Name: {
        return this.userManager;
      }
      case entityTypes.CONTACT_INFORMATION.Name: {
        return this.contactInformationManager;
      }
      default: {
        throw new Error(`Loader for ${entityType} wasn't implemented. `);
      }

    }
  }

}
