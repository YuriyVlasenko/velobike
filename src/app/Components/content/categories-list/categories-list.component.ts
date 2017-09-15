import { Component, OnInit } from '@angular/core';
import EntityDataProvider from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  public rootCategories;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {

    this.edp.categoriesTreeSubject
      .subscribe((categoryTreeNodes) => {
        this.rootCategories = categoryTreeNodes;
      });

  }
}
