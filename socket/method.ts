import { methodRes } from './utilities/methodRes';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import logger from '../logger';
import jwt from 'jsonwebtoken'
import srvConfig from '../config';
import { UserSessionMap } from './validate/userSession';


require('../database/model/users');
const db = mongoose.connection;
const Users = mongoose.model('Users');
const cmc_crypto_infoSchema = db.collection('cmc_crypto_info')
const cmc_crypto_categorySchema = db.collection('cmc_crypto_category')
const cmc_crypto_categoriesSchema = db.collection('cmc_crypto_categories')



const auth = async (socket, paramsSchema, req) => {
    console.log(req, paramsSchema);

    methodRes.success(socket, {
        type: 'success',
        method: req.method,
        id: req.id,
        message: 'Đăng nhập thành công',
        result: paramsSchema.output,
    })
}

const cmc_crypto_info = async (socket, paramsSchema, req) => {
    let [symbol] = req.params;

    await cmc_crypto_infoSchema.findOne({ symbol: symbol }, function (err, symbolInfo) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (!symbolInfo) {
            logger.info(`[Missing data]: ${JSON.stringify(req)}`)
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Data not found.',
                result: {}
            })
        } else {
            return methodRes.success(socket, {
                method: req.method,
                id: req.id,
                message: 'Tra cứu dữ liệu thành công',
                result: symbolInfo,
            })
        }
    });
}
const cmc_crypto_category = async (socket, paramsSchema, req) => {
    let [id] = req.params;

    await cmc_crypto_categorySchema.findOne({ id: id }, function (err, data) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (!data) {
            logger.info(`[Missing data]: ${JSON.stringify(req)}`)
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Data not found.',
                result: {}
            })
        } else {
            return methodRes.success(socket, {
                method: req.method,
                id: req.id,
                message: 'Tra cứu dữ liệu thành công',
                result: data,
            })
        }
    });
}
const cmc_crypto_categories = async (socket, paramsSchema, req) => {
    let [] = req.params;

    await cmc_crypto_categoriesSchema.find({}).limit(50).toArray(function (err, data) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (!data) {
            logger.info(`[Missing data]: ${JSON.stringify(req)}`)
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Data not found.',
                result: {}
            })
        } else {
            return methodRes.success(socket, {
                method: req.method,
                id: req.id,
                message: 'Tra cứu dữ liệu thành công',
                result: data,
            })
        }
    });
}

const auth_login = async (socket, paramsSchema, req) => {
    let [username, password] = req.params;

    await Users.findOne({ username: username }, function (err, user) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (!user) {
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Username and/or password is incorrect.',
                result: {}
            })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Username and/or password is incorrect.',
                result: {}
            })
        }
        // ------ Generate token JWT ------- 
        const token = jwt.sign({
            iat: Math.floor(Date.now() / 1000) - 30,
            iss: "training-frontend",
            name: user.username,
            roles: ['admin'],
        }, srvConfig.SESSION_SECRET, { expiresIn: 60 * 60 })
        // ------ 
        return methodRes.success(socket, {
            method: req.method,
            id: req.id,
            message: 'Đăng nhập thành công!',
            result: {
                user: {
                    username: user.username,
                    name: user.name,
                }, 
                token: token,
            },
        })
    });
}
const authenticate = async (socket, paramsSchema, req) => {
    let [token] = req.params;
    const { id } = socket

    jwt.verify(token, srvConfig.SESSION_SECRET, function (err, decoded) {
        // console.log(decoded, err)
        if (err) {
            logger.info({ message: "Xác thực token thất bại", ...err })
            return methodRes.error(socket, {
                method: req.method,
                id: req.id,
                message: 'Error when authen!',
                result: err,
            })
        } else {
            UserSessionMap.setUserSession(id, { jwt: decoded, token, auth: true })
            console.log('UserSessionMap', UserSessionMap);
            
            return methodRes.success(socket, {
                method: req.method,
                id: req.id,
                message: 'User is successfully authen!',
                result: decoded,
            })
        }
    })
    return
}

const auth_register = async (socket, paramsSchema, req) => {
    let [name, username, password] = req.params;

    if (!name || !username || !password) return methodRes.error(socket, {
        method: req.method,
        id: req.id,
        message: 'All fields are required!',
        result: {}
    })

    await Users.findOne({ username: username }, async function (err, user) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: {}
        })
        if (user) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Username already exist!',
            result: {}
        })

        const salt = bcrypt.genSaltSync(10);
        const newUser = new Users({
            name: name,
            username: username,
            password: bcrypt.hashSync(password, salt)
        });

        await newUser.save(function (err) {
            if (err) return console.error(err);
        });

        return methodRes.success(socket, {
            method: req.method,
            id: req.id,
            message: 'User is successfully registered!',
            result: {},
        })
    });
}


export default {
    auth,
    cmc_crypto_info,
    cmc_crypto_category,
    cmc_crypto_categories,
    auth_register,
    auth_login,
    authenticate
}