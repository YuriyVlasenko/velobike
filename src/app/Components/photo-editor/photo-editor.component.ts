import { Component, OnInit, Input } from '@angular/core';
import Product from '../../Model/product';
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

  addImage(imageUrl) {
    console.log(`add url: ${imageUrl}`)
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
