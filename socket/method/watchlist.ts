import { methodRes } from './../utilities/methodRes';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import logger from '../../logger';
import jwt from 'jsonwebtoken'
import srvConfig from '../../config';
import { UserSessionMap } from './../validate/userSession';

const db = mongoose.connection;
require('../../database/model/users');
const Users = mongoose.model('Users');

const get_user_watchlist = async (socket, paramsSchema, req) => {
    // Xác thực quyền admin trước khi phản hồi
    const userSession = UserSessionMap.getUserSession(socket.id)    
    if (!userSession || !userSession.auth) {
        methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Bạn cần đăng nhập để thực hiện dịch vụ này',
            result: {}
        })
        return
    }
    // -------------------- 
    await Users.findOne({ username: userSession?.jwt?.name }, function (err, user) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: []
        })
        // ------ 
        return methodRes.success(socket, {
            method: req.method,
            id: req.id,
            message: 'Tra cứu dữ liệu thành công!',
            result: user.watchlist || []
        })
    })

    return
}
const add_token_to_user_watchlist = async (socket, paramsSchema, req) => {
    const [symbol] = req.params;
    // Xác thực quyền admin trước khi phản hồi
    const userSession = UserSessionMap.getUserSession(socket.id)    
    if (!userSession || !userSession.auth) {
        methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Bạn cần đăng nhập để thực hiện dịch vụ này',
            result: {}
        })
        return
    }
    // -------------------- 
    await Users.updateOne({ username: userSession?.jwt?.name }, {
        $push: { "watchlist": symbol }
    }, {}, function (err, user) {
        if (err) return methodRes.error(socket, {
            method: req.method,
            id: req.id,
            message: 'Internal Error',
            result: []
        })
        // ------ 
        return methodRes.success(socket, {
            method: req.method,
            id: req.id,
            message: 'Thực hiện thành công!',
            result: user.watchlist || []
        })
    })

    return
}



export {
    get_user_watchlist,
    add_token_to_user_watchlist
}