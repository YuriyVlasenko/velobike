import { Component, OnInit, Input } from '@angular/core';
import Product from '../../Model/product';
import ProductImage from '../../Model/productImage';

import ProductImageManager from '../../Services/entityManagers/product-images-manager.service';

@Component({
  selector: 'photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() product: Product;

  constructor(private productImageManager: ProductImageManager) { }

  ngOnInit() {
    console.log('this.product', this.product);
  }

  addImage({ url, width, height }) {

    console.log(`add `, url, width, height);

    const productImage = new ProductImage('', this.product.id, url, width, height);

    this.productImageManager
      .createOrUpdate(productImage)
      .subscribe((isCompleted) => {
        if (isCompleted) {
          // TODO: remoad 
        }
      })

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
