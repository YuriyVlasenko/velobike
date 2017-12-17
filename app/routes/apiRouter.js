import express from 'express';
import categoriesModel from '../db/models/categories';
import parametersModel from '../db/models/parameters';
import productParametersModel from '../db/models/productParameters';
import productsModel from '../db/models/products';
import valueTypesModel from '../db/models/valueTypes';
import contactInformationModel from '../db/models/contactInformation';
import usersModel from '../db/models/users';
import slidesModel from '../db/models/slides';
import productImagesModel from '../db/models/productImages';
import cloudinary from 'cloudinary';
import cacheManager from '../cacheManager';

const protectedModels = [usersModel.name];

const getAuthenticator = (modelName) => {

    return (req, res, next) => next();

    if (modelName) {
        if (protectedModels.indexOf(modelName) !== -1) {
            return authenticator;
        }
        return (req, res, next) => next();
    }
    return authenticator;
}

const authenticator = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    res.status(403).end();
}

const removeImageFromCloudinary = (model, itemId) => {
    return new Promise((resolve, reject) => {
        model.getOne(itemId).then((entity) => {

            console.log(entity);
            console.log('get entity wit id: ' + itemId);

            if (entity) {
                const imageCode = entity.getImageCode();
                console.log('imageCode', imageCode);

                cloudinary.v2.api.delete_resources([imageCode], function (error, result) {
                    console.log(error, result);
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });
}

const createModelApi = (router, model) => {

    // get all items
    router.get(`/${model.name}`, getAuthenticator(model.name), function (req, res) {

        if (cacheManager.contain(model.name)) {
            return res.send({ isOk: true, data: cacheManager.get(model.name) });
        }

        console.log(`get all items for ${model.name}`)

        model.getAll().then((data) => {
            cacheManager.set(model.name, data);
            return res.send({ isOk: true, data });
        }).catch((error) => {
            return res.send({ isOk: false, error });
        });

    });

    // get one item
    router.get(`/${model.name}/:id`, getAuthenticator(model.name), function (req, res) {

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
    router.post(`/${model.name}`, function (req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        cacheManager.reset(model.name);

        if (model.name === usersModel.name) {
            if (req.body.id) {
                req.body.name = null;
            }
        }

        console.log(`create or update item for ${model.name} with id ${req.body.id}`);
        console.log(req.body);

        model.createOrUpdate(req.body)
            .then((data) => {
                return res.send({ isOk: true, data });
            })
            .catch((error) => {
                return res.send({ isOk: false, error });
            });

    });



    // delete item
    router.delete(`/${model.name}/:id`, getAuthenticator(), function (req, res) {

        let itemId = req.params.id;
        if (!itemId) return res.sendStatus(400);

        cacheManager.reset(model.name);

        let modelSpecificAction = new Promise((resolve, reject) => {
            switch (model.name) {
                case productsModel.name: {

                    //itemId
                    productImagesModel
                        .find({ productId: itemId })
                        .then((productImages) => {

                            let imageCodes = productImages.map((image) => {
                                return image.getImageCode();
                            });

                            cloudinary.v2.api.delete_resources(imageCodes, function (error, result) {
                                console.log(error, result);
                                resolve();
                            });
                        });

                    productParametersModel
                        .find({ productId: itemId })
                        .then((productParameters) => {
                            let ppIds = productParameters.map((productParameter) => productParameter.id);
                            for (let i = 0; i < ppIds.length; i++) {
                                productParametersModel.deleteOne(ppIds[i]);
                            }
                            resolve();
                        })

                    break;
                }
                case productImagesModel.name:
                case slidesModel.name: {
                    removeImageFromCloudinary(model, itemId).then(resolve).catch(reject);
                    break;
                }
                default: {
                    resolve();
                }
            }
        })

        console.log(`remove item for ${model.name} with id ${itemId}`);
        modelSpecificAction.then(() => {
            console.log('modelSpecificAction resolved');

            model.deleteOne(itemId).then((isCompleted) => {
                return res.send({ isOk: true, data: isCompleted });
            }).catch((error) => {
                return res.send({ isOk: false, error });
            })
        })
    });
}

const apiRouter = express.Router();

const models = [categoriesModel, parametersModel, productParametersModel, productsModel, valueTypesModel,
    contactInformationModel, usersModel, productImagesModel, slidesModel];

// Create routes for models.
for (let i = 0; i < models.length; i++) {
    createModelApi(apiRouter, models[i]);
}

export default apiRouter;