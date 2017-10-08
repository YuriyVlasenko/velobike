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

    this.edp.getCategoriesTree()
      .subscribe((categoryTreeNodes) => {
        this.rootCategories = categoryTreeNodes;
      });

    this.uiEventsService.onCategorySelected.subscribe((category) => {
      if (category){
        this.activeCategoryId = category.id;
      }
      else{
        let activeNode =  this.tree.treeModel.getActiveNode();
        if (activeNode){
          activeNode.toggleActivated();
          this.tree.treeModel.setFocusedNode();
          this.tree.treeModel.collapseAll();
        }
      }
      
    });

  }

  treeInitialized() {
    // Wait for tree rendered.
    setTimeout(() => {
      if (this.activeCategoryId) {
        const treeNode = this.tree.treeModel.getNodeById(this.activeCategoryId)
        if (treeNode) {
          const selectedCategory = treeNode.data as CategoryTreeNode;
          selectedCategory.shouldLoadProducts = false;

          treeNode.toggleActivated();
          treeNode.ensureVisible();
        }
      }
    }, 500);
  }

  selectedNodeChanged($event) {

    const selectedCategory = $event.node.data as CategoryTreeNode;
    if (selectedCategory) {

      if (selectedCategory.shouldLoadProducts) {
        this.router.navigate(['/', selectedCategory.friendlyName]);
      }
      selectedCategory.shouldLoadProducts = true;
    }

  }
}
