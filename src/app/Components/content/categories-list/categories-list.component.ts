import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import EntityDataProvider from '../../../Services/entity-data-provider.service';
import CategoryTreeNode from '../../../Model/categoryTreeNode';


@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  public rootCategories;
  public categoryProducts = [];
  private selectedCategory: CategoryTreeNode;

  constructor(private edp: EntityDataProvider, private router: Router) { }

  ngOnInit() {

    this.edp.categoriesTree
      .subscribe((categoryTreeNodes) => {
        this.rootCategories = categoryTreeNodes;
      });
  }


  selectedNodeChanged($event) {

    const selectedCategory = $event.node.data as CategoryTreeNode;
    if (selectedCategory) {
      this.router.navigate(['/', selectedCategory.friendlyName]);
    }

  }
}