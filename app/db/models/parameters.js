import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'parameters';

const modelSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  valueTypeId: { type: String, required: true },
  description: { type: String }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
  constructor() {
    super(Model, modelName);
    this.modelFields = ['id', 'name', 'valueTypeId', 'description'];
  }

  createItem(data) {

    const { id, name, valueTypeId, description } = data;
    const newItem = new Model({ name, valueTypeId, description, id });

    return this.save(newItem);

  }

  validate(data, isCreate) {

    const { name, valueTypeId, description } = data;

    if (isCreate) {

      this._fieldValidator.validateStringEmpty(name, 'name');
      this._fieldValidator.validateStringEmpty(valueTypeId, 'valueTypeId');

    }

    this._fieldValidator.validateStringLength(name, 'name');
    this._fieldValidator.validateStringLength(valueTypeId, 'valueTypeId');
  }

  updateItem(data) {

    const { id, name, valueTypeId, description } = data;

    return this._updateItem(id, { name, valueTypeId, description });

  }
}

export default new ModelClass();