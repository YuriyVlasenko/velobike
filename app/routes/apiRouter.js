import express from 'express';
import categoriesModel from '../db/models/categories';
import parametersModel from '../db/models/parameters';
import productParametersModel from '../db/models/productParameters';
import productsModel from '../db/models/products';
import valueTypesModel from '../db/models/valueTypes';
import contactInformationModel from '../db/models/contactInformation';
import usersModel from '../db/models/users';

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    res.status(403).end();
}

const createModelApi = (router, model) => {

    // get all items
    router.get(`/${model.name}`, function (req, res) {

        console.log(`get all items for ${model.name}`)
        model.getAll().then((data) => {
            return res.send({ isOk: true, data });
        }).catch((error) => {
            return res.send({ isOk: false, error });
        });

    });

    // get one item
    router.get(`/${model.name}/:id`, function (req, res) {

        var itemId = req.params.id;
        if (!itemId) return res.sendStatus(400);

        console.log(`get one item for ${model.name} with id ${itemId}`);

        model.getOne(itemId).then((data) => {
            return res.send({ isOk: true, data });
        }).catch((error) => {
            return res.send({ isOk: false, error });
        })
    });

    // Create item or update.
    router.post(`/${model.name}`, ensureAuthenticated, function (req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }


        console.log(`create or update item for ${model.name} with id ${req.body.id}`);
        console.log(req.body);

        model.createOrUpdate(req.body).then((data) => {
            return res.send({ isOk: true, data });
        }).catch((error) => {
            return res.send({ isOk: false, error });
        });

    });

    // delete item
    router.delete(`/${model.name}/:id`, ensureAuthenticated, function (req, res) {

        var itemId = req.params.id;
        if (!itemId) return res.sendStatus(400);

        console.log(`remove item for ${model.name} with id ${itemId}`);

        model.deleteOne(itemId).then(() => {
            return res.send({ isOk: true });
        }).catch((error) => {
            return res.send({ isOk: false, error });
        })

    });
}

const apiRouter = express.Router();

const models = [categoriesModel, parametersModel, productParametersModel, productsModel, valueTypesModel, contactInformationModel, usersModel];
// Create routes for models.
for (let i = 0; i < models.length; i++) {
    createModelApi(apiRouter, models[i]);
}

export default apiRouter;