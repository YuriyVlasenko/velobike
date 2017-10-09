import { Component, OnInit } from '@angular/core';
import UIEventsService from '../../../Services/ui-events.service';
import EntityDataProvider from '../../../Services/entity-data-provider.service'
import ContactInformation from '../../../Model/contactInformation';

@Component({
  selector: 'delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.scss']
})
export class DeliveryPageComponent implements OnInit {

  public deliveryPageContent: string;

  constructor(private uiEventsService: UIEventsService,
    private edp: EntityDataProvider) { }

  ngOnInit() {
    this.uiEventsService.onCategorySelected.emit(null);

    this.edp.getContactInformation().subscribe((contactinformationItems) => {
      if (contactinformationItems.length > 0){
        this.deliveryPageContent = contactinformationItems[0].deliveryPageContent;
      }
    });
  }

}
