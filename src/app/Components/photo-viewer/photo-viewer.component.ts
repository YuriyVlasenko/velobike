import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {

  @Input() 
  productId: string;
  
  // TODO: implement

  constructor() { } 

  ngOnInit() {
  }

}
