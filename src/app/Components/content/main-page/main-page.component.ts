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

  constructor(
    private edp: EntityDataProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params
      .switchMap((params: Params) => {

        if (!params.category) {
          return [];
        }

        return this.edp.findCategory({ friendlyName: params.category })
          .switchMap((categories: Category[]) => {
            return this.edp
              .findProducts({ categoryId: categories[0].id, name: undefined });
          });


      }).subscribe((products) => {
        this.products = products;
      });
  }

  selectProduct(productId) {
    this.router.navigate(['/product', productId]);
  }
}
