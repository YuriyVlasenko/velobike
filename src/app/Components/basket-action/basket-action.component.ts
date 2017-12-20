import { Component, OnInit, Input } from '@angular/core';
import EntityDataProvider from '../../Services/entity-data-provider.service';


@Component({
  selector: 'basket-action',
  templateUrl: './basket-action.component.html',
  styleUrls: ['./basket-action.component.scss']
})
export class BasketActionComponent implements OnInit {

  @Input() productId: string;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
  }

  isItemInBasket() {
    return this.edp.currentOrder.itemIds.indexOf(this.productId) !== -1;
  }

  toggleItem() {
    this.isItemInBasket() ? this.removeFromBasket() : this.addToBasket();
  }

  addToBasket() {
    this.edp.addItemToBasket(this.productId, 1);
  }

  removeFromBasket() {
    this.edp.removeItemFromBasket(this.productId);
  }

}
