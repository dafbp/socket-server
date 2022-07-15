import express from 'express';
const init = express.Router();
import path from 'path';
import authRoute from './auth/auth';

init.get("/", async function (req, res, next) {
    res.json({
        'version': 1.0,
        'name': 'Express.js & Socket.io API boilerplate'
    });
});


/**
 * Configure here all routes
 */
init.use('/auth/', authRoute)

export default init
