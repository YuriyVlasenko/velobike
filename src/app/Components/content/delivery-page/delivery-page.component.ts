import { Component, OnInit } from '@angular/core';
import UIEventsService from '../../../Services/ui-events.service';

@Component({
  selector: 'delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.scss']
})
export class DeliveryPageComponent implements OnInit {

  constructor(private uiEventsService: UIEventsService) { }

  ngOnInit() {
    this.uiEventsService.onCategorySelected.emit(null);
  }

}
