import { Component, OnInit, Input } from '@angular/core';
import User from '../../../Model/user';

@Component({
  selector: 'user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  @Input() entityData: User;

  constructor() { }

  ngOnInit() {
  }

}
