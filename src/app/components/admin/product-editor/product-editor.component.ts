import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Product from '../../../Model/product';
import ProductParameter from '../../../Model/productParameter';
import Parameter from '../../../Model/parameter';
import Category from '../../../Model/category';
import EntityDataProvider from '../../../Services/entity-data-provider.service';
import EntityTypes from '../../../Services/entity-types';
import IEntity from '../../../Model/IEntity';

@Component({
  selector: 'product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  @Input() entityData: Product;
  @Output() onChange = new EventEmitter<Product>();

  public categoriesList: Category[];
  public isCreating: boolean = false;
  public selectedParameterId: string;
  public selectedParameterValue: string;
  public allParameters: Parameter[];

  constructor(private edp: EntityDataProvider) { }

  ngOnInit() {

    console.log(this.entityData);

    this.isCreating = !this.entityData.id;

    // todo: load exist product parameters
    //productParameters

    this.edp.parameters.subscribe((parametersList: Parameter[]) => {
      this.allParameters = parametersList;
    })

    this.edp.getEntities(EntityTypes.CATEGORIES.Name).subscribe((entities: Category[]) => {
      this.categoriesList = entities;
    });
  }

  saveChanges() {
    this.onChange.emit(this.entityData);
  }

  addParameter() {

  }

  editProductParameter(productParameter: ProductParameter) {

    console.log('product parameter selected for editing', productParameter);
    this.selectedParameterId = productParameter.parameterId;
    this.selectedParameterValue = productParameter.value;
  }

  deleteProductParameter(productParameter: ProductParameter) {
    console.log('product parameter deleted', productParameter);

    //productParameter.id // TODO: remove from db
    this.entityData.parameters = this.entityData.parameters.filter((parameter: ProductParameter) => {
      return parameter.id !== productParameter.id;
    })
  }

  selectProductParameter(productParameter: ProductParameter) {
    console.log('product parameter selected', productParameter);
  }

  imageSelected(imageData) {
    console.log('image data', imageData);
  }
}
