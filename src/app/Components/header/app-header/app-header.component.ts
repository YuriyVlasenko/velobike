import { Component, OnInit } from '@angular/core';
import ContactInformation from '../../../Model/contactInformation';
import EntityDataProviderService from '../../../Services/entity-data-provider.service';
import { Router } from '@angular/router';
import Order from '../../../Model/order';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public contactInfo: ContactInformation;
  public order: Order;


  constructor(private edp: EntityDataProviderService, private router: Router) {
    this.contactInfo = new ContactInformation('', '', '', '', '', '', 1, '', '')
    this.order = this.edp.currentOrder;
  }

  goToBasket() {
    this.router.navigate(['/', 'basket']);
  }

  ngOnInit() {
    this.edp.getContactInformation()
      .subscribe((contactInfoItems: ContactInformation[]) => {

        if (contactInfoItems.length) {
          this.contactInfo = contactInfoItems[0];
        }
      });
  }
}
