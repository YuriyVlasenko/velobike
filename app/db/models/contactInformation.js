import mongoose from 'mongoose';
import ModelBase from './modelBase';

const Schema = mongoose.Schema;
const modelName = 'contactInformation';

const modelSchema = new Schema({
    id: { type: String, required: true },
    phones: { type: String, required: true },
    workTime: { type: String },
    slogan: { type: String },
    usdCourse: { type: Number, default: 1 },
    deliveryPageContent: { type: String },
    mainPageContent: { type: String },
    headerColor: { type: String },
    additionalContacts:  { type: String }
});

const Model = mongoose.model(modelName, modelSchema);

class ModelClass extends ModelBase {

    constructor() {

        super(Model, modelName);
        this.modelFields = ['phones', 'workTime', 'slogan', 'id', 'deliveryPageContent', 'mainPageContent', 'usdCourse', 'headerColor', 'additionalContacts'];
    }

    createItem(data) {

        const { id, phones, workTime, slogan, deliveryPageContent, mainPageContent, usdCourse, headerColor, additionalContacts } = data;
        const newItem = new Model({
            phones, workTime, slogan, id,
            deliveryPageContent, mainPageContent, usdCourse, headerColor, additionalContacts
        });

        return this.save(newItem);
    }

    validate(data, isCreate) {

        const { phones, workTime, slogan, headerColor, additionalContacts } = data;

        if (isCreate) {

            this._fieldValidator.validateStringEmpty(phones, 'phones');
        }

        this._fieldValidator.validateStringLength(phones, 'phones');
        this._fieldValidator.validateStringLength(workTime, 'workTime');
        this._fieldValidator.validateStringLength(slogan, 'slogan');
        this._fieldValidator.validateStringLength(headerColor, 'headerColor');
    }

    updateItem(data) {

        const { id, phones, workTime, slogan, mainPageContent, deliveryPageContent, usdCourse, headerColor, additionalContacts } = data;

        return this._updateItem(id, {
            phones, workTime, slogan,
            mainPageContent, deliveryPageContent, usdCourse, headerColor, additionalContacts
        });
    }
} 

export default new ModelClass();