import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'slides';

const modelSchema = new Schema({
    id: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, required: true, default: 0 }
});

modelSchema.methods.getImageCode = function (cb) {
    if (this.url){
        var publicIdRx = new RegExp('(\\w+)\\.\\w+$');
        let matches = this.url.match(publicIdRx)
        if (matches.length> 1){
            return matches[1];
        }
    }
    return '';
};


const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {
    constructor() {
        super(Model, modelName);
        this.modelFields = ['id', 'url', 'order'];
    }

    createItem(data) {

        const { id, url, order } = data;
        const newItem = new Model({ id, url, order });

        return this.save(newItem);
    }


    validate(data, isCreate) {

        const { id, url, order } = data;

        if (isCreate) {

            this._fieldValidator.validateStringEmpty(url, 'url');
        }

        this._fieldValidator.validateStringLength(url, 'url');

    }

    updateItem(data) {

        const { id, url, order } = data;

        return this._updateItem(id, { url, order });

    }
}

export default new ModelClass();

