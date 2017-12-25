import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'orders';

const modelSchema = new Schema({
    id: { type: String, required: true },
    date: { type: String, required: true },
    customerName: { type: String },
    customerPhone: { type: String, required: true },
    city: { type: String },
    deliveryPoint: { type: String },
    summ: { type: Number, required: true, default: 0 },
    itemIds: { type: Array, required: true },
    itemCounts: { type: Array, required: true },
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
    constructor() {
        super(Model, modelName);
        this.modelFields = ['id', 'date', 'customerName', 'customerPhone', 'summ', 'itemIds',
            'itemCounts', 'city', 'deliveryPoint'];
    }

    createItem(data) {

        const { id, customerName, customerPhone, summ, itemIds, itemCounts, city, deliveryPoint } = data;

        const dateValue = new Date();
        const date = `${dateValue.getDate()}-${dateValue.getMonth() + 1}-${dateValue.getFullYear()} ${dateValue.getHours()}:${dateValue.getMinutes()} `
        const newItem = new Model({ id, date, customerName, customerPhone, summ, itemIds, itemCounts, city, deliveryPoint });

        return this.save(newItem);
    }

    validate(data, isCreate) {

        const { date, customerName, customerPhone, city, deliveryPoint } = data;

        if (isCreate) {
            this._fieldValidator.validateStringEmpty(customerName, 'customerName');
            this._fieldValidator.validateStringEmpty(customerPhone, 'customerPhone');
        }
        this._fieldValidator.validateStringLength(customerName, 'customerName');
        this._fieldValidator.validateStringLength(customerPhone, 'customerPhone');
        this._fieldValidator.validateStringLength(city, 'city');
        this._fieldValidator.validateStringLength(deliveryPoint, 'deliveryPoint');
    }

    updateItem(data) {
        const { id, date, customerName, customerPhone, summ, itemIds, itemCounts, city, deliveryPoint } = data;
        return this._updateItem(id, { date, customerName, customerPhone, summ, itemIds, itemCounts, city, deliveryPoint });
    }
}

export default new ModelClass();