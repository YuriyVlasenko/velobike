import { Component, OnInit, Input } from '@angular/core';
import Product from '../../Model/product';


@Component({
  selector: 'photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {

  @Input() product: Product;

  private productImages: any[];

  constructor() { }

  ngOnInit() {
    console.log('this.product', this.product);
    this.productImages = [{ "_id": "59d23d0e54f22233b4d28169", "id": "6ccc4220-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945006/lvsxmjbnrjrisztjb7zw.jpg", "width": 214, "height": 236, "__v": 0 }, { "_id": "59d23d2454f22233b4d2816a", "id": "79fb80a0-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945054/bq7nohpvz6ns1oo4j0vs.png", "width": 1200, "height": 1088, "__v": 0 }, { "_id": "59d23d4354f22233b4d2816b", "id": "8c9724d0-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945077/uvcmnttlvgupik7zekh0.png", "width": 2619, "height": 1707, "__v": 0 }, { "_id": "59d23d5554f22233b4d2816c", "id": "972d9000-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945094/wcwwmgnhznuyeeyyjhel.png", "width": 615, "height": 477, "__v": 0 }, { "_id": "59d23d6a54f22233b4d2816d", "id": "a3f18990-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945119/kjqnhbas9cfwi76tlgwj.png", "width": 580, "height": 345, "__v": 0 }, { "_id": "59d23d7c54f22233b4d2816e", "id": "aeacbad0-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945133/mfabep6ria6t6hxkjp2n.png", "width": 1000, "height": 658, "__v": 0 }, { "_id": "59d23d9454f22233b4d2816f", "id": "bca9f7b0-a774-11e7-a2f1-432e5cfb5ced", "productId": "974b31d0-9c4a-11e7-84fd-37c1e54759b0", "url": "http://res.cloudinary.com/velobike/image/upload/v1506945151/tobtrnegrm7vrmtgotgg.png", "width": 1301, "height": 832, "__v": 0 }];
  }

  addImage(imageUrl){
    console.log(`add url: ${imageUrl}`)
  }

  removeImage(imageUrl){
    console.log(`remove url: ${imageUrl}`)
  }

}
