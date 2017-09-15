import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'productParameters';

const modelSchema = new Schema({
  id: { type: String, required: true },
  productId: { type: String, required: true },
  parameterId: { type: String, required: true },
  value: { type: String, required: true }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
  constructor() {
    super(Model, modelName);

    this.modelFields = ['id', 'productId', 'parameterId', 'value'];
  }

  createItem(data) {

    const { id, parameterId, productId, value } = data;
    const newItem = new Model({ parameterId, productId, value, id });

    return this.save(newItem);
  }

  validate(data, isCreate) {

    const { parameterId, productId, value } = data;

    if (isCreate) {

      this._fieldValidator.validateStringEmpty(productId, 'productId');
      this._fieldValidator.validateStringEmpty(parameterId, 'parameterId');
      this._fieldValidator.validateStringEmpty(value, 'value');

    }

    this._fieldValidator.validateStringLength(productId, 'productId');
    this._fieldValidator.validateStringLength(parameterId, 'parameterId');
    this._fieldValidator.validateStringLength(value, 'value');
  }

  updateItem(data) {

    const { id, parameterId, productId, value } = data;

    return this._updateItem(id, { id, parameterId, productId, value });

  }
}

export default new ModelClass();