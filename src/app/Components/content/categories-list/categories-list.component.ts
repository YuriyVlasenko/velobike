import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import UIEventsService from '../../../Services/ui-events.service';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import CategoryTreeNode from '../../../Model/categoryTreeNode';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  @ViewChild('tree') tree;

  public rootCategories;
  public categoryProducts = [];
  private selectedCategory: CategoryTreeNode;
  private activeCategoryId: String;

  constructor(private edp: EntityDataProvider,
    private uiEventsService: UIEventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.edp.categoriesTree
      .subscribe((categoryTreeNodes) => {
        this.rootCategories = categoryTreeNodes;
      });

    this.uiEventsService.onCategorySelected.subscribe((category) => {
      this.activeCategoryId = category.id;
    });

  }

  treeInitialized() {
    console.log('treeInitialized');

    // Wait for tree rendered.
    setTimeout(()=>{

      if (this.activeCategoryId){
        const treeNode = this.tree.treeModel.getNodeById(this.activeCategoryId)
        if (treeNode){
          treeNode.toggleActivated();
          treeNode.ensureVisible();
        }
      }
    }, 1000);
  }

  selectedNodeChanged($event) {

    const selectedCategory = $event.node.data as CategoryTreeNode;
    if (selectedCategory) {
      this.router.navigate(['/', selectedCategory.friendlyName]);
    }

  }
}
