import { Component, OnInit, Input } from '@angular/core';
import ContactInformation from '../../../Model/contactInformation';

@Component({
  selector: 'contact-information-editor',
  templateUrl: './contact-information-editor.component.html',
  styleUrls: ['./contact-information-editor.component.scss']
})
export class ContactInformationEditorComponent implements OnInit {

  @Input() entityData: ContactInformation;

  constructor() { }

  ngOnInit() {
  }

}
