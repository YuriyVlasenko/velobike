import { Component, OnInit, Input } from '@angular/core';
import ProductImage from '../../Model/productImage';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryAnimation, INgxGalleryImage } from 'ngx-gallery';

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

    this.galleryOptions = [
      {
        width : '600px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize : NgxGalleryImageSize.Contain,
        arrowPrevIcon : 'fa fa-arrow-circle-o-left',
        arrowNextIcon : 'fa fa-arrow-circle-o-right'
      }
    ];

    this.galleryImages = this.images.map((productImage) => {
      return new GalleryImage(productImage.url);
    });
  }
}
