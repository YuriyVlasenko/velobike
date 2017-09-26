import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Category from '../../../Model/category';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {

  @Input() entityData: Category;
  @Output() onChange = new EventEmitter<Category>();

  public categoriesList: IEntity[];

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    this.edp.getEntities(EntityTypes.CATEGORIES.Name).subscribe((entities: IEntity[]) => {
      this.categoriesList = [new Category('', '', '', ''), ...entities];
    });
  }

  saveChanges() {
    this.onChange.emit(this.entityData);
  }

}
