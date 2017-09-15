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
        return new Promise((res, req) => {
            this._model.find((error, items) => {
                error ? rej(error) : res(items);
            })
        });
    }

    find(filter) {
        return new Promise((res, req) => {
            this._model.find(filter, (error, items) => {
                error ? rej(error) : res(items);
            })
        });
    }

    getOne(id) {

        const filter = {};
        filter[this.idField] = id;

        return new Promise((res, req) => {

            this._model.find(filter, (error, items) => {

                if (error) {
                    rej(error);
                    return;
                }

                if (!items || items.count == 0) {
                    rej("Can't find item");
                    return;
                }

                res(items[0]);
            })
        });
    }

    deleteOne(id) {

        const filter = {};
        filter[this.idField] = id;

        return new Promise((res, rej) => {
            this._model.deleteOne(filter, (error) => {
                error ? rej(error) : res();
            });
        });
    }

    save(item) {
        return new Promise((res, rej) => {
            item.save((error) => {
                error ? rej(error) : res();
            });
        });
    }

    validate(data) {
        // overriden by childrens.
    }

    createOrUpdate(data) {

        data = this.__restrictFields(data, this.modelFields);

        const isCreate = data.id != undefined;

        let error = null;

        try {
            this.validate(data, isCreate);
        }
        catch (exc) {
            error = exc;
            console.log(`Validation error ${error}`);
        }

        if (error) {
            return Promise.reject(error);
        }

        if (isCreate) {
            return this.updateItem(data);
        }
        else {
            data.id = this.__generateId();
            return this.createItem(data);
        }
    }

    

    _updateItem(id, newData) {

        const filter = {};
        filter[this.idField] = id;

        return getOne(filter).then((item) => {
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