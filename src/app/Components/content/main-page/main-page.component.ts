import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Product from '../../../Model/product';
import Category from '../../../Model/category';
import EntityDataProvider from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public products: Product[] = [];
  public product: Product = null;

  private currentCategoryFriendlyName: String;

  constructor(
    private edp: EntityDataProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.currentCategoryFriendlyName = params.category;

      if (params.category && params.id) {

        // load product details view
        this.edp.findProducts({
          id: params.id,
          categoryId: undefined,
          name: undefined
        }).subscribe((products) => {
          if (products.length > 0 && products[0]) {
            this.product = products[0];
          }
          else {
            this.product = null;
            this.router.navigate([this.currentCategoryFriendlyName]);
          }
        });
        return;
      }

      if (params.category) {
        // load category products
        this.edp.findCategory({ friendlyName: params.category })
          .switchMap((categories: Category[]) => {
            return this.edp.findProducts({
              categoryId: categories[0].id,
              name: undefined,
              id: undefined
            });
          })
          .subscribe((products) => {
            this.products = products;
          });

        return;
      }
    })
  }

  selectProduct(productId) {
    this.router.navigate([this.currentCategoryFriendlyName, productId]);
  }
}