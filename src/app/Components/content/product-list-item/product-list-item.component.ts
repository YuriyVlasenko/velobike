import { Input, Output, HostListener, Component, OnInit, EventEmitter } from '@angular/core';
import Product from '../../../Model/product';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;
  @Output() productSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    // Only left mouse button click is allowed.
    if (event.which === 1) {
      this.productSelected.emit(this.product.id);
    }
  }

}
