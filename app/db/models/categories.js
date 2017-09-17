import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'categories';

const modelSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  order: {type: Number, default: 0 },
  parentId: { type: String}
});

const Model = mongoose.model(modelName, modelSchema);
 
class ModelClass extends ModelBase {
  constructor() { 
    super(Model, modelName);

    this.modelFields = ['id', 'name', 'parentId', 'order'];

  }

  createItem(data) {

    const { id, name, parentId, order } = data;
    const newItem = new Model({ name, parentId, id, order });

    return this.save(newItem);
  }

  validate(data, isCreate) {

    const { name, parentId, order } = data;

    if (isCreate) {

      this._fieldValidator.validateStringEmpty(name, 'name');

    }

    this._fieldValidator.validateStringLength(name, 'name');
    this._fieldValidator.validateStringLength(parentId, 'parentId');
    this._fieldValidator.validateNumber(order, 'order', -100, 100);

  }

  updateItem(data) {

    const { id, name, parentId, order } = data;

    return this._updateItem(id, { name, parentId, order });

  }
}

export default new ModelClass();