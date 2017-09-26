import { Component, OnInit, Input } from '@angular/core';
import Product from '../../../Model/product';

@Component({
  selector: 'product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  @Input() entityData: Product;

  constructor() { }

  ngOnInit() {
  }

}
