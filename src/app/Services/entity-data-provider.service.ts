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
import SlidesManager from './entityManagers/slides-manager.service';

import Parameter from '../Model/parameter';
import ValueType from '../Model/valueType';
import ProductParameter from '../Model/productParameter';
import Category from '../Model/category';
import Product from '../Model/product';
import ProductImage from '../Model/productImage';
import ContactInformation from '../Model/contactInformation';
import Slide from '../Model/slide';
import IEntity from './../Model/IEntity';

import entityTypes from '../Services/entity-types';
import CategoryTreeNode from '../Model/categoryTreeNode';

@Injectable()
export default class EntityDataProviderService {

  public activatedRoute = new BehaviorSubject([]); // TODO: check

  constructor(
    private categoriesManager: CategorieManager,
    private productManager: ProductManager,
    private contactInformationManager: ContactInformationManager,
    private productParameterManager: ProductParameterManager,
    private valueTypeManager: ValueTypeManager,
    private parameterManager: ParameterManager,
    private userManager: UserManager,
    private productImageManager: ProductImageManager,
    private slidesManager: SlidesManager) {

    this.getProducts(true);
  }


  getProducts(useCache: boolean = false): Observable<Product[]> {
    let productLoader = this.productManager.getAll(useCache);
    productLoader = this._applyImagesForProducts(productLoader);
    productLoader = this._applyParametersForProduct(productLoader);
    productLoader = this._applyCurrencyCourseForProduct(productLoader);
    return productLoader;
  }

  getSlides(useCache: boolean = false): Observable<Slide[]> {
    return this.slidesManager.getAll(useCache);
  }

  _applyImagesForProducts(productsLoader: Observable<any[]>): Observable<any[]> {
    return productsLoader.switchMap((products) => {
      return this._getProductImages().map((productImages: ProductImage[]) => {
        // Add images to products
        products.forEach((product: Product) => {

          product.images = productImages.filter((productImage) => {
            return productImage.productId === product.id
          })
        })
        return products;
      });
    }
    );
  }

  _getProductImages(useCache: boolean = false): Observable<ProductImage[]> {
    return this.productImageManager.getAll(useCache);
  }

  _applyParametersForProductParameters(productParametersLoader: Observable<any[]>): Observable<any[]> {
    return productParametersLoader.switchMap((productParameters) => {

      return this.getParameters().map((parameterItems: Parameter[]) => {

        productParameters.forEach((productParameter) => {
          productParameter.parameter = parameterItems.find((parameterItem) => parameterItem.id === productParameter.parameterId);
        });

        return productParameters;
      });
    });
  }

  _applyValueTypesForParameters(parametersLoader: Observable<any[]>): Observable<any[]> {

    return parametersLoader.switchMap((parameters) => {
      return this._getValueTypes().map((valueTypeItems: ValueType[]) => {

        parameters.forEach((parameter) => {
          parameter.valueType = valueTypeItems.find((valueTypeItem) => valueTypeItem.id === parameter.valueTypeId);
        })

        return parameters;
      });
    });
  }

  _applyCurrencyCourseForProduct(itemsLoader: Observable<any[]>): Observable<any[]> {
    return itemsLoader.switchMap((items) => {
      return this._getContactInformation().map((contactInformationItems: ContactInformation[]) => {
        if (contactInformationItems.length > 0) {
          const course = contactInformationItems[0].usdCourse || 1;
          console.log('course' + course);
          items.forEach((product: Product) => {
            product.setCourse(course);
          })
        }
        return items;
      })
    });
  }

  _applyParametersForProduct(itemsLoader: Observable<any[]>): Observable<any[]> {
    return itemsLoader.switchMap((items) => {
      return this._getProductParameters().map((productParameterItems: ProductParameter[]) => {
        // Add parameters to products
        items.forEach((productItem: Product) => {
          productItem.parameters = productParameterItems.filter((productParameterItem) => {
            return productParameterItem.productId === productItem.id
          })
        })
        return items;
      })
    });
  }

  _getProductParameters(useCache: boolean = false): Observable<ProductParameter[]> {
    let ppLoader = this.productParameterManager.getAll(useCache);
    ppLoader = this._applyParametersForProductParameters(ppLoader);
    return ppLoader;
  }

  _getParameters(useCache: boolean = false): Observable<Parameter[]> {
    return this._applyValueTypesForParameters(this.parameterManager.getAll(useCache));
  }

  _getValueTypes(useCache: boolean = false): Observable<ValueType[]> {
    return this.valueTypeManager.getAll(useCache)
  }

  _getContactInformation(useCache: boolean = false): Observable<ContactInformation[]> {
    return this.contactInformationManager.getAll(useCache);
  }

  getParameters(useCache: boolean = false): Observable<Parameter[]> {
    return this._getParameters(useCache);
  }

  getCategoriesTree(): Observable<CategoryTreeNode[]> {
    return this.categoriesManager.getAllAsTree();
  }

  getContactInformation(useCache: boolean = false): Observable<ContactInformation[]> {
    return this._getContactInformation(useCache);
  }



  // TODO: check. try to return only one item.
  findCategory({ friendlyName }, useCache: boolean = false): Observable<Category[]> {
    return this.categoriesManager.getAll(useCache).map((categories: Category[]) => {
      const result = categories.filter((category: Category) => {
        return category.isMatch({ friendlyName })
      });
      return result;
    });
  }

  findProducts({ categoryId, name, id }): Observable<Product[]> {

    const localSubject = new AsyncSubject<Product[]>();

    this.getProducts().subscribe((productItems) => {

      let filteredProducts = productItems.filter((product: Product) => {
        return product.isMatch({ id, categoryId }) && product.isContains({ name });
      });

      this.activatedRoute.next(filteredProducts);

      localSubject.next(filteredProducts);
      localSubject.complete();

    });

    return localSubject.asObservable();
  }

  getEntity(entityType: string, entityId: string): Observable<any> {
    const itemLoader = this._getEntityManagerService(entityType).getOne(entityId);

    if (entityType === entityTypes.PRODUCTS.Name) {

      let productLoader = itemLoader.map((product) => { return [product]; });
      productLoader = this._applyParametersForProduct(productLoader);
      productLoader = this._applyImagesForProducts(productLoader);

      return productLoader.map((products) => products[0]);

    }
    return itemLoader;
  }

  getEntities(entityType: string, useCache: boolean = false): Observable<IEntity[]> {
    const itemsLoader = this._getEntityManagerService(entityType).getAll(useCache);

    if (entityType === entityTypes.PRODUCTS.Name) {

      let productLoader = itemsLoader;
      productLoader = this._applyParametersForProduct(productLoader);
      productLoader = this._applyImagesForProducts(productLoader);

      return itemsLoader;
    }

    return itemsLoader;
  }

  deleteEntity(entityType: string, entityId: string) {
    const entityManager = this._getEntityManagerService(entityType);
    return entityManager.delete(entityId);
  }

  createOrUpdateEntity(entityType: string, entityData: any): Observable<string> {
    const entityManager = this._getEntityManagerService(entityType);
    return entityManager.createOrUpdate(entityData);
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
      case entityTypes.SLIDES.Name: {
        return this.slidesManager;
      }
      case entityTypes.PRODUCT_PARAMETER.Name: {
        return this.productParameterManager;
      }
      default: {
        throw new Error(`Loader for ${entityType} wasn't implemented. `);
      }

    }
  }

}
