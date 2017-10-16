import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'products';

const modelSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number, default: 0 },
  priceUSD: { type: Number, default: 0 },
  newPriceUSD: { type: Number, default: 0 },
  order: { type: Number, default: 0 }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
  constructor() {
    super(Model, modelName);

    this.modelFields = ['id', 'name', 'categoryId', 'description', 'price', 'order', 'priceUSD', 'newPriceUSD', 'imageUrl'];
  }

  createItem(data) {

    const { id, name, categoryId, description, price, order, priceUSD, newPriceUSD, imageUrl } = data;
    const newItem = new Model({ name, categoryId, description, price, order, id, priceUSD, newPriceUSD, imageUrl });

    return this.save(newItem);
  }

  validate(data, isCreate) {

    let { name, categoryId, description, price, order, priceUSD, newPriceUSD } = data;


    if (isCreate) {

      price = price || 0;
      newPriceUSD = newPriceUSD || 0;

      this._fieldValidator.validateStringEmpty(name, 'name');
      this._fieldValidator.validateStringEmpty(categoryId, 'categoryId');
      this._fieldValidator.validateNumber(price, 'price', 0, this._fieldValidator.maxPrice);
      this._fieldValidator.validateNumber(priceUSD, 'priceUSD', 0, this._fieldValidator.maxPrice);
      this._fieldValidator.validateNumber(newPriceUSD, 'newPriceUSD', 0, this._fieldValidator.maxPrice);

    }

    this._fieldValidator.validateStringLength(name, 'name');
    this._fieldValidator.validateStringLength(categoryId, 'categoryId');

    if (newPriceUSD !== undefined) {
      newPriceUSD = newPriceUSD || 0;
      this._fieldValidator.validateNumber(newPriceUSD, 'newPriceUSD', 0, this._fieldValidator.maxPrice);
    }

    if (priceUSD !== undefined) {
      priceUSD = priceUSD || 0;
      this._fieldValidator.validateNumber(priceUSD, 'priceUSD', 0, this._fieldValidator.maxPrice);
    }

    if (price !== undefined) {
      price = price || 0;
      this._fieldValidator.validateNumber(price, 'price', 0, this._fieldValidator.maxPrice);
    }

    if (order !== undefined) {
      this._fieldValidator.validateNumber(order, 'order', 0, this._fieldValidator.maxPrice);
    }

  }

  updateItem(data) {

    const { id, name, categoryId, description, price, order, priceUSD, newPriceUSD, imageUrl } = data;

    return this._updateItem(id, { name, categoryId, description, price, order, priceUSD, newPriceUSD, imageUrl });

  }
}

export default new ModelClass();