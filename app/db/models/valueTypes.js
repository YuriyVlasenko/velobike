import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'valueTypes';

const modelSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  validationExpression: { type: String }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
  constructor() {
    super(Model, modelName);

    this.modelFields = ['id', 'name', 'validationExpression'];
  }

  createItem(data) {

    const { id, name, validationExpression } = data;
    const newItem = new Model({ name, validationExpression, id });

    return this.save(newItem);
  }

  updateItem(data) {

    const { id, name, validationExpression } = data;

    return this._updateItem(id, { name, validationExpression });
  }

  validate(data, isCreate) {

    const { name, validationExpression } = data;

    if (isCreate) {

      this._fieldValidator.validateStringEmpty(name, 'name');

    }

    this._fieldValidator.validateStringLength(name, 'name');
    this._fieldValidator.validateStringLength(validationExpression, 'validationExpression');
  }
}

export default new ModelClass();