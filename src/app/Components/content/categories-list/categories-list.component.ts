import { Component, OnInit } from '@angular/core';
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

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {

    this.edp.categoriesTree
      .subscribe((categoryTreeNodes) => {
        this.rootCategories = categoryTreeNodes;
      });
  }


  selectedNodeChanged($event) {

    this.selectedCategory = $event.node.data as CategoryTreeNode;

    let findSubject = this.edp.findProducts({ categoryId: this.selectedCategory.id, name: undefined });

    // TODO: unsibscribe
    findSubject.subscribe((products) => {
      this.categoryProducts = products;
      console.log('this.edp.findProducts({})', products);
    });

  }
}
