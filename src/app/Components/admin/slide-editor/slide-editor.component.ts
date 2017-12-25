import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Slide from '../../../Model/slide';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss']
})

export class SlideEditorComponent implements OnInit {

  @Input() entityData: Slide;
  @Output() onChange = new EventEmitter<Slide>();

  public isCreating = false;
  public isImageLoading = false;

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {
    this.isCreating = !this.entityData.id;
  }

  startUploading() {
    this.isImageLoading = true;
  }

  setImage(imageData) {
    this.entityData.url = imageData.url;
    this.isImageLoading = false;
  }

  saveChanges() {
    this.onChange.emit(this.entityData);
  }
}
