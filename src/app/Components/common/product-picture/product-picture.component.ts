import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-picture',
  templateUrl: './product-picture.component.html',
  styleUrls: ['./product-picture.component.scss']
})
export class ProductPictureComponent implements OnInit {

  @Input() productId: string;

  public noPhotoUrl = '/assets/noPhoto.png'

  constructor() { }

  ngOnInit() {

    //this.noPhotoUrl

    //productId

  }

}
