import { Input, Output, HostListener, Component, OnInit, EventEmitter, HostBinding } from '@angular/core';
import Product from '../../../Model/product';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;
  @Output() productSelected = new EventEmitter<string>();
  @HostBinding('class.is-sold-out') isSoldOut: boolean;

  constructor() { }

  ngOnInit() {
    this.isSoldOut = !this.product.isActive;
  }

  selectItem(){
    this.productSelected.emit(this.product.id);
  }
}
