import { Component, OnInit } from '@angular/core';
import ContactInformation from '../../../Model/contactInformation';
import EntityDataProviderService from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public contactInfo: ContactInformation;

  constructor(private edp: EntityDataProviderService) {
    this.contactInfo = new ContactInformation(null, null, null, null);
  }

  ngOnInit() {
    this.edp.getContactInformation()
      .subscribe((contactInfoItems: ContactInformation[]) => {

        if (contactInfoItems.length) {
          this.contactInfo = contactInfoItems[0];
        }
      });
  }

  searchProducts(searchedExpression) {
    this.edp.findProducts({ name: searchedExpression, categoryId: null, id: null }).subscribe((machedProducts)=>{
      console.log('machedProducts');
      console.log(machedProducts);
    })
  }

}
