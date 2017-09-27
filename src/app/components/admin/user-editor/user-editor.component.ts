import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import User from '../../../Model/user';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  @Input() entityData: User;
  @Output() onChange = new EventEmitter<User>();

  public passwordsMatch: boolean = true;
  public passwordConfirmation: string;

  public isCreating: boolean = false;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    this.isCreating = !this.entityData.id;
  }

  saveChanges() {

    if (this.passwordConfirmation !== this.entityData.password) {
      this.passwordsMatch = false;
      return;
    }

    this.onChange.emit(this.entityData);
  }
}
