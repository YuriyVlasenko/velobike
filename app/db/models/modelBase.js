import uuid from 'uuid/v1';
import FieldValidator from '../fieldValidator';

export default class ModelBase {

    constructor(model, name, idField = 'id') {
        this._model = model;
        this.name = name;
        this.idField = idField;
        this.modelFields = [];
        this._fieldValidator = new FieldValidator();
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this._model.find((error, items) => {
                error ? reject(error) : resolve(items);
            })
        });
    }

    find(filter) {
        return new Promise((resolve, reject) => {
            this._model.find(filter, (error, items) => {
                error ? reject(error) : resolve(items);
            })
        });
    }

    getOne(id) {

        const filter = {};
        filter[this.idField] = id;

        return new Promise((resolve, reject) => {

            this._model.find(filter, (error, items) => {

                if (error) {
                    reject(error);
                    return;
                }

                if (!items || items.count == 0) {
                    reject("Can't find item");
                    return;
                }

                resolve(items[0]);
            })
        });
    }

    deleteOne(id) {

        const filter = {};
        filter[this.idField] = id;

        return new Promise((resolve, reject) => {
            this._model.deleteOne(filter, (error) => {
                error ? reject(error) : resolve(true);
            });
        });
    }

    save(item) {
        return new Promise((resolve, reject) => {
            item.save((error) => {
                // Return item id.
                error ? reject(error) : resolve(item.id);
            });
        });
    }

    validate(data) {
        // overriden by childrens.
    }

    createOrUpdate(data) {
        data = this.__restrictFields(data, this.modelFields);
        const isCreateMode = !data.id;
        let error = null;

        try {
            this.validate(data, isCreateMode);
        }
        catch (exc) {
            error = exc;
            console.log(`Validation error ${error}`);
        }

        if (error) {
            return Promise.reject(error);
        }

        if (isCreateMode) {
            data.id = this.__generateId();
            return this.createItem(data);
        }
        else {
            return this.updateItem(data);
        }
    }

    _updateItem(id, newData) {

        return this.getOne(id)
            .then((item) => {
                Object.assign(item, newData);
                return this.save(item);
            });
    }

    __generateId() {
        return uuid();
    }

    __restrictFields(data, fields) {
        const newData = {};
        for (let i = 0; i < fields.length; i++) {
            let fieldName = fields[i];
            let fieldValue = data[fieldName];
            if (fieldValue !== undefined) {
                newData[fieldName] = fieldValue;
            }
        }
        return newData;
    }
}