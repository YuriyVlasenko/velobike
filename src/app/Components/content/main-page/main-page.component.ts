import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Product from '../../../Model/product';
import EntityDataProvider from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public products: Product[] = [];

  constructor(private edp: EntityDataProvider, private router: Router) {
  }

  ngOnInit() {
    /*
    this.edp.displayedProducts.subscribe((displayedProducts) => {
      this.products = displayedProducts;
    })
    */
  }

  selectProduct(productId) {
    this.router.navigate(['/product', productId]);
  }
}
