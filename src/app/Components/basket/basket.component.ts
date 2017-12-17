import { Component, OnInit } from '@angular/core';
import Order from '../../Model/order';
import EntityDataProviderService from '../../Services/entity-data-provider.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public order: Order;

  constructor(private edp: EntityDataProviderService) {

    this.order = edp.currentOrder;
  }

  ngOnInit() {

  }

  getOrderSumm() {
    let summ = 0;
    this.order.items.map((item) => {
      summ += item.summ;
    })
    return summ;
  }

  removeOrderItem(index) {
    this.order.items.splice(index, 1);
  }

  saveOrder() {
    // TODO: implement
    console.log(this.order);

  }

}
