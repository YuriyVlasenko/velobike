import { Component, OnInit } from '@angular/core';

import EntityDataProvider from '../../../Services/entity-data-provider.service';

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {

  public additionalContacts: string;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    this.edp.getContactInformation().subscribe((contactinfo) => {
      this.additionalContacts = contactinfo[0].additionalContacts;
    })
  }

}
