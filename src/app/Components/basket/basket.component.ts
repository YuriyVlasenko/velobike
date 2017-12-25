import { Component, OnInit } from '@angular/core';
import Order from '../../Model/order';
import OrderItem from '../../Model/orderItem';
import EntityDataProviderService from '../../Services/entity-data-provider.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public order: Order;
  public orderId: string;

  constructor(private edp: EntityDataProviderService) {
    this.order = edp.currentOrder;
  }

  ngOnInit() {
    this.edp.getProducts(true).subscribe((products) => {
      const basketProducts = [];
      products.forEach((product) => {
        const productIndex = this.order.itemIds.indexOf(product.id);
        if (productIndex !== -1) {
          basketProducts[productIndex] = new OrderItem(product, this.order.itemCounts[productIndex]);
        }
      });
      this.order.items = basketProducts;
    });
  }

  getOrderSumm() {
    let summ = 0;
    this.order.items.map((item) => {
      summ += item.summ;
    });
    return summ;
  }

  removeOrderItem(index) {
    this.order.items.splice(index, 1);
  }

  saveOrder() {
    const { items, customerName, customerPhone, city, deliveryPoint } = this.order;

    const itemCounts = [];
    const itemIds = [];
    items.forEach((item) => {
      if (item.count > 0) {
        itemCounts.push(item.count);
        itemIds.push(item.product.id);
      }
    });

    this.edp.createOrder({ customerName, customerPhone, itemCounts, itemIds, city, deliveryPoint }).subscribe((orderId) => {
      this.orderId = orderId.substr(orderId.length - 6, 6);
      this.edp.currentOrder.itemCounts = [];
      this.edp.currentOrder.itemIds = [];
      this.edp.currentOrder.items = [];

    });

  }

}
