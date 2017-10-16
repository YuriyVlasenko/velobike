import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import Product from '../../../Model/product';
import Slide from '../../../Model/slide';

import Category from '../../../Model/category';
import ContactInformation from '../../../Model/contactInformation';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import UIEventsService from '../../../Services/ui-events.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public slides: Slide[] = [];
  public products: Product[] = [];
  public product: Product = null;
  public isMainPageContentVisible: boolean = true;
  public mainPageContent: string;
  public currentPage: number = 1;

  private currentCategoryFriendlyName: String;



  constructor(
    private edp: EntityDataProvider,
    private router: Router,
    private uiEventsService: UIEventsService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.edp.getSlides().subscribe((slides) => {
      this.slides = slides;
    })

    this.activatedRoute.params.subscribe((params: Params) => {

      this.currentCategoryFriendlyName = params.category;
      this.isMainPageContentVisible = false;

      if (params.expression) {
        this.edp.findProducts({ categoryId: null, id: null, name: params.expression })
          .subscribe((products) => {
            this.products = products;
          });
        return;
      }

      if (params.category) {
        this.edp
          .findCategory({ friendlyName: params.category })
          .subscribe((categories: Category[]) => {
            if (categories.length > 0) {
              this.uiEventsService.onCategorySelected.emit(categories[0]);
            }
          });
      }

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

            if (categories.length === 0) {
              this.router.navigate(['']);
              return [];
            }

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

      this.isMainPageContentVisible = true;
      this.uiEventsService.onCategorySelected.emit(null);

      this.edp.getContactInformation().subscribe((contactInformationItems) => {
        if (contactInformationItems.length > 0) {
          this.mainPageContent = contactInformationItems[0].mainPageContent;
        }
      })
    })
  }

  selectProduct(productId) {
    this.router.navigate([this.currentCategoryFriendlyName, productId]);
  }
}
