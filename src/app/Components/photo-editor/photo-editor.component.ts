import { Component, OnInit, Input } from '@angular/core';
import Product from '../../Model/product';
import ProductImage from '../../Model/productImage';

import entityTypes from '../../Services/entity-types';
import ProductImageManager from '../../Services/entityManagers/product-images-manager.service';
import EntityDataProviderService from '../../Services/entity-data-provider.service';

@Component({
  selector: 'photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() product: Product;

  public isImageLoading: boolean = false;
  public isMarkAsMainImageProcessing: boolean = false;

  constructor(private productImageManager: ProductImageManager,
    private edp: EntityDataProviderService) { }

  ngOnInit() {
  }

  startUploading() {
    this.isImageLoading = true;
  }

  addImage({ url, width, height }) {

    const productImage = new ProductImage('', this.product.id, url, width, height);

    this.productImageManager
      .createOrUpdate(productImage)
      .subscribe((newItemId) => {
        if (newItemId) {
          productImage.id = newItemId;
          this.product.images.push(productImage);
        }
        this.isImageLoading = false;
      })

  }

  selectImage(image) {
    // deselect all
    this.product.images.forEach((image) => {
      image.isSelected = false;
    });

    image.isSelected = true;
  }

  markAsMainImage() {
    const selectedImages = this.product.images.filter((image) => image.isSelected);
    if (selectedImages.length === 0) {
      return;
    }

    this.isMarkAsMainImageProcessing = true;

    this.product.imageUrl = selectedImages[0].url;

    this.edp
      .createOrUpdateEntity(entityTypes.PRODUCTS.Name, this.product)
      .subscribe((result) => {
        this.isMarkAsMainImageProcessing = false;
      });
  }

  removeImage(imageId) {
    this.productImageManager.delete(imageId)
      .subscribe((isCompleted) => {
        if (isCompleted) {
          this.product.images = this.product.images
            .filter((image) => {
              return image.id !== imageId;
            })
        }
      })
  }

}

