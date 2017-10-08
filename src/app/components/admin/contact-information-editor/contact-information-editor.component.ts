import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ContactInformation from '../../../Model/contactInformation';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'contact-information-editor',
  templateUrl: './contact-information-editor.component.html',
  styleUrls: ['./contact-information-editor.component.scss']
})
export class ContactInformationEditorComponent implements OnInit {

  @Input() entityData: ContactInformation;
  @Output() onChange = new EventEmitter<ContactInformation>();

  public isCreating: boolean = false;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {

  }

  saveChanges() {
    console.log(this.entityData);
    this.onChange.emit(this.entityData);
  }

}
