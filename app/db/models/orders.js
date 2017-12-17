import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'orders';

const modelSchema = new Schema({
    id: { type: String, required: true },
    date: { type: String, required: true },
    customerName: { type: String },
    customerPhone: { type: String, required: true },
    summ: { type: Number, required: true, default: 0 },
    itemIds: { type: Array, required: true},
    itemCounts: { type: Array, required: true},
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
    constructor() {
        super(Model, modelName);
        this.modelFields = ['id', 'date', 'customerName', 'customerPhone', 'summ'];
    }

    createItem(data) {

        const { id, customerName, customerPhone, summ } = data;

        let date = new Date();
        const newItem = new Model({ id, date, customerName, customerPhone, summ });

        return this.save(newItem);
    }

    validate(data, isCreate) {

        const { date, customerName, customerPhone } = data;

        if (isCreate) {
            this._fieldValidator.validateStringEmpty(customerName, 'customerName');
            this._fieldValidator.validateStringEmpty(customerPhone, 'customerPhone');
        }
        this._fieldValidator.validateStringLength(customerName, 'customerName');
        this._fieldValidator.validateStringLength(customerPhone, 'customerPhone');
    }

    updateItem(data) {
        const { id, date, customerName, customerPhone, summ } = data;
        return this._updateItem(id, { date, customerName, customerPhone, summ });
    }
}

export default new ModelClass();