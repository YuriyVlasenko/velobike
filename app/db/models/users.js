import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'users';

const modelSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
  constructor() {
    super(Model, modelName);
    this.modelFields = ['id', 'name', 'password'];
  }

  createItem(data) {

    const { id, name, password } = data;
    const newItem = new Model({ id, name, password });

    return this.save(newItem);
  }


  validate(data, isCreate) {

    const { id, name, password } = data;

    if (isCreate) {

      this._fieldValidator.validateStringEmpty(name, 'name');
      this._fieldValidator.validateStringEmpty(password, 'password');

    }

    this._fieldValidator.validateStringLength(name, 'name');
    this._fieldValidator.validateStringLength(password, 'password');
  }

  updateItem(data) {

    const { id, name, password } = data;

    return this._updateItem(id, { name, password });

  }
}

export default new ModelClass();

