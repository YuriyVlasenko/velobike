import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ValueType from '../../../Model/valueType';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import Order from '../../../Model/order';
import OrderItem from '../../../Model/orderItem';

class OrderDetailItem {
  constructor(public name: string, public value: string) {

  }
}

@Component({
  selector: 'order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  public orderDetailsItems: OrderDetailItem[] = [];
  public isCreating: boolean = false;

  @Input() entityData: Order;
  @Output() onChange = new EventEmitter<ValueType>();

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    console.log(this.entityData);
    this.orderDetailsItems.push(new OrderDetailItem('Номер заказа: ', this.entityData.id.substr(-6, 6)));
    this.orderDetailsItems.push(new OrderDetailItem('Дата: ', this.entityData.date));
    this.orderDetailsItems.push(new OrderDetailItem('Покупатель: ', this.entityData.customerName));
    this.orderDetailsItems.push(new OrderDetailItem('Телефон: ', this.entityData.customerPhone));
    this.orderDetailsItems.push(new OrderDetailItem('Город: ', this.entityData.city));
    this.orderDetailsItems.push(new OrderDetailItem('Отделение: ', this.entityData.deliveryPoint));
    this.isCreating = !this.entityData.id;

    this.edp.getProducts(true).subscribe((products)=>{
      const orderProducts = [];
      products.forEach((product) => {
        const productIndex = this.entityData.itemIds.indexOf(product.id);
        if (productIndex !== -1) {
          orderProducts[productIndex] = new OrderItem(product, this.entityData.itemCounts[productIndex]);
        }
      });
      this.entityData.items = orderProducts;
      console.log(orderProducts);
    })
  }

  saveChanges() {
    //this.onChange.emit(this.entityData);
  }
}
