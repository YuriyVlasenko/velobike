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

    this.edp.getParameters().subscribe((parametersList: Parameter[]) => {
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

    let existParameters = this.entityData.parameters
      .filter((parameter: ProductParameter) => {
        return parameter.parameterId === this.selectedParameterId;
      });

    const isAdd = existParameters.length === 0;
    let pp: ProductParameter;
    if (isAdd) {
      pp = new ProductParameter('', this.entityData.id, this.selectedParameterId, this.selectedParameterValue);
    }
    else {
      pp = existParameters[0];
      pp.value = this.selectedParameterValue;
    }

    this.edp
      .createOrUpdateEntity(EntityTypes.PRODUCT_PARAMETER.Name, pp)
      .subscribe((newItemId) => {
        if (isAdd) {
          pp.id = newItemId;

          pp.parameter = this.allParameters.filter((parameter) => {
            return parameter.id === pp.parameterId;
          })[0];

          this.entityData.parameters.push(pp);
          
        }
      })
  }

  editProductParameter(productParameter: ProductParameter) {

    console.log('product parameter selected for editing', productParameter);
    this.selectedParameterId = productParameter.parameterId;
    this.selectedParameterValue = productParameter.value;
  }

  deleteProductParameter(productParameter: ProductParameter) {
    this.edp
      .deleteEntity(EntityTypes.PRODUCT_PARAMETER.Name, productParameter.id)
      .subscribe((isCompleted) => {
        if (isCompleted) {
          this.entityData.parameters = this.entityData.parameters.filter((parameter: ProductParameter) => {
            return parameter.id !== productParameter.id;
          });
        }
      })
  }
}
