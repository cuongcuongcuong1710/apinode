import models from '../../models';
import { NotFoundError } from '../middleWares/errors';
import moment from 'moment';

export async function getAllProduct(req, res, next) {

    try {
        const products = await models.Product.findAll();
        if (!products) {
            throw new NotFoundError('Product');
        }
        res.send(products);
    } catch (error) {
        next(error);
    }
}

export async function createProduct(req, res, next) {

    const user = res.locals.user;
    const object = res.locals.object;
    try {
        const product = await models.Product.create({
            name: object.name,
            quantity: object.quantity,
            price: object.price,
            //expired: moment(object.expired).format('MM/DD/YYYY', 'hh:mm:ss a'),
            expired: object.expired,
            createBy: user.userId
        })
        res.send(product);
    } catch (error) {
        next(error);
    }
}

export async function getProductByID(req, res, next) {

    const itemID = req.params.id;
    try {
        const item = await models.Product.findOne({
            where: {
                id: itemID
            }
        });
        if (!item)
            throw new NotFoundError('Product');
        const productRes = {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }
        res.send(productRes);
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(req, res, next) {
    const itemID = req.params.id;
    const user = res.locals.user;
    const object = res.locals.object;
    try {
        const item = await models.Product.findOne({
            where: {
                id: itemID
            }
        })
        if (!item) {
            throw new NotFoundError('Product');
        }
        const newItem = await item.update({
            name: object.name,
            quantity: object.quantity,
            price: object.price,
            updateBy: user.userId
        })
        res.send(newItem);
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req, res, next) {

    const itemID = req.params.id;
    try {
        const item = await models.Product.findOne({
            where: {
                id: itemID
            }
        })
        if (!item)
            throw new NotFoundError();
        item.destroy();
        res.send('Đã xóa');
    } catch (error) {
        next(error);
    }
}