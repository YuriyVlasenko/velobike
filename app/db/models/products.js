import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'products';

const modelSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, default: 0 },
  order: { type: Number, default: 0 }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
  constructor() {
    super(Model, modelName);

    this.modelFields = ['id', 'name', 'categoryId', 'description', 'price', 'order'];
  }

  createItem(data) {

    const { id, name, categoryId, description, price, order } = data;
    const newItem = new Model({ name, categoryId, description, price, order, id });

    return this.save(newItem);
  }

  validate(data, isCreate) {

    const { name, categoryId, description, price, order } = data;

    if (isCreate) {

      this._fieldValidator.validateStringEmpty(name, 'name');
      this._fieldValidator.validateStringEmpty(categoryId, 'categoryId');
      this._fieldValidator.validateNumber(price, 'price', 0, this._fieldValidator.maxPrice);

    }

    this._fieldValidator.validateStringLength(name, 'name');
    this._fieldValidator.validateStringLength(categoryId, 'categoryId');
    this._fieldValidator.validateStringLength(description, 'description');

    if (price !== undefined) {
      this._fieldValidator.validateNumber(price, 'price', 0, this._fieldValidator.maxPrice);
    }

    if (order !== undefined) {
      this._fieldValidator.validateNumber(order, 'order', 0, this._fieldValidator.maxPrice);
    }

  }

  updateItem(data) {

    const { id, name, categoryId, description, price, order } = data;

    return this._updateItem(id, { name, categoryId, description, price, order });

  }
}

export default new ModelClass();