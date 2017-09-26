import { Component, OnInit, Input } from '@angular/core';
import Category from '../../../Model/category';

@Component({
  selector: 'category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {

  @Input() entityData: Category;

  constructor() { }

  ngOnInit() {
  }

}
