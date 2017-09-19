import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'contancInformation';

const modelSchema = new Schema({
    id: { type: String, required: true },
    phones: { type: String, required: true },
    workTime: { type: String },
    slogan: { type: String }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {

    constructor() {
        super(Model, modelName);

        this.modelFields = ['phones', 'workTime', 'slogan'];
    }

    createItem(data) {

        const { id, phones, workTime, slogan } = data;
        const newItem = new Model({ phones, workTime, slogan, id });

        return this.save(newItem);
    }

    validate(data, isCreate) {

        const { phones, workTime, slogan } = data;

        if (isCreate) {

            this._fieldValidator.validateStringEmpty(phones, 'phones');
        }

        this._fieldValidator.validateStringLength(phones, 'phones');
        this._fieldValidator.validateStringLength(workTime, 'workTime');
        this._fieldValidator.validateStringLength(slogan, 'slogan');
    }

    updateItem(data) {
        
            const { id, phones, workTime, slogan } = data;
        
            return this._updateItem(id, { phones, workTime, slogan });
        
          }
}