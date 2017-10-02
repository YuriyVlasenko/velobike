import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'productImages';

const modelSchema = new Schema({
    id: { type: String, required: true },
    productId: { type: String, required: true },
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
    constructor() {
        super(Model, modelName);

        this.modelFields = ['id', 'productId', 'url', 'width', 'height'];
    }

    createItem(data) {

        const { id, productId, url, width, height } = data;
        const newItem = new Model({ id, productId, url, width, height });

        return this.save(newItem);
    }

    validate(data, isCreate) {

        const { productId, url, width, height } = data;

        if (isCreate) {

            this._fieldValidator.validateStringEmpty(productId, 'productId');
            this._fieldValidator.validateStringEmpty(url, 'url');
            
        }

        this._fieldValidator.validateNumber(width, "width", 0, 20000);
        this._fieldValidator.validateNumber(height, "height", 0, 20000);
        this._fieldValidator.validateStringLength(productId, 'productId');
        this._fieldValidator.validateStringLength(url, 'url');
    }

    updateItem(data) {

        const { id, productId, url, width, height } = data;

        return this._updateItem(id, { productId, url, width, height });

    }
}

export default new ModelClass();