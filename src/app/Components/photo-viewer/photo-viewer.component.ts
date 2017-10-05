import { Component, OnInit, Input } from '@angular/core';
import ProductImage from '../../Model/productImage';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';

class GalleryImage {

  public small: string;
  public medium: string;
  public big: string;
  public description: string;

  constructor(url: string) {
    this.small = this.medium = this.big = url;
    this.description = '';
  }

}

@Component({
  selector: 'photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})

export class PhotoViewerComponent implements OnInit {

  @Input()
  images: ProductImage[];

  public galleryImages: GalleryImage[] = [];
  public galleryOptions: NgxGalleryOptions[] = [];

  constructor() { }

  ngOnInit() {
    this.galleryImages = this.images.map((productImage) => {
      return new GalleryImage(productImage.url);
    });
  }
}
