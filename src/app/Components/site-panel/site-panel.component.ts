import { Component, OnInit } from '@angular/core';
import CategoriesManagerService from '../../Services/entityManagers/categories-manager.service'
import ProductsManagerService from '../../Services/entityManagers/product-manager.service'
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-site-panel',
  templateUrl: './site-panel.component.html',
  styleUrls: ['./site-panel.component.scss']
})
export class SitePanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
