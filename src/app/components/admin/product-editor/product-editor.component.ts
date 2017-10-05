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

    this.isCreating = !this.entityData.id;

    if (this.isCreating) {
      this.entityData = new Product('', '', '', '', 0, 0);
    }

    console.log(this.entityData);

    // todo: load exist product parameters
    //productParameters

    this.edp.getParameters()
      .subscribe((parametersList: Parameter[]) => {
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

    let selectedPP = this.entityData.parameters.find((productParameter) => {
      return productParameter.parameterId === this.selectedParameterId;
    })

    if (selectedPP) {
      // update product parameter
      selectedPP.value = this.selectedParameterValue;
      this.edp.createOrUpdateEntity(EntityTypes.PRODUCT_PARAMETER.Name, selectedPP);
    }
    else {
      let newProductParameter = new ProductParameter('', this.entityData.id, this.selectedParameterId, this.selectedParameterValue);
      this.edp
        .createOrUpdateEntity(EntityTypes.PRODUCT_PARAMETER.Name, newProductParameter)
        .subscribe((newItemId) => {
          newProductParameter.id = newItemId;
          newProductParameter.parameter = this.allParameters.find((parameter) => {
            return parameter.id === newProductParameter.parameterId;
          });
          this.entityData.parameters.push(newProductParameter);
        });
    }
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
          })
        }
        else {
          console.error(`erro on deleting item with id: ${productParameter.id}`)
        }
      })
  }

  selectProductParameter(productParameter: ProductParameter) {
    console.log('product parameter selected', productParameter);
  }
}
