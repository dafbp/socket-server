
import express from 'express';
const app = express();
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const expressSwagger = require('express-swagger-generator')(app);
import srvConfig from './config';
import mongoose from 'mongoose';

const { CONNECTION_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME, DB_QUERY_PARAMS } = srvConfig;
const dbAuthString = (DB_USERNAME && DB_PASSWORD) ? `${srvConfig.DB_USERNAME}:${srvConfig.DB_PASSWORD}@` : '';
let httpServer;
import socketABIMethod from './socket/abi/abi.json';
import fs from 'fs';
import methodCall from './socket/method'

/**
 * Configure middleware
 */
app.use(
    cors({
        // origin: `http://localhost:${srvConfig.SERVER_PORT}`,
        // origin: "http://localhost:3000",
        origin: function (origin, callback) {
            console.log("origin function", origin, callback);

            return callback(null, true)
        },
        // origin: "*",
        optionsSuccessStatus: 200,
        credentials: true
    }),
    session({
        saveUninitialized: true,
        secret: srvConfig.SESSION_SECRET,
        resave: true
    }),
    cookieParser(),
    bodyParser.json()
);

/**
 * Include all API Routes
 */
import routesConfig from './routes/api';
import { methodRes } from './socket/utilities/methodRes';
import { startListenCryptoMarketData } from './socket/market/CryptoMarketData/index';
import { marketRes } from './socket/utilities/marketRes';
import SubcriberManagerInstance from './socket/market/index';
import EventInternalInstance from './socket/event';
import logger from './logger';

app.use('/api', routesConfig);

/**
 * Swagger UI documentation
 */
if (srvConfig.SWAGGER_SETTINGS.enableSwaggerUI)
    expressSwagger(srvConfig.SWAGGER_SETTINGS);

/**
 * Configure http(s)Server
 */
if (srvConfig.HTTPS_ENABLED) {
    const privateKey = fs.readFileSync(srvConfig.PRIVATE_KEY_PATH, 'utf8');
    const certificate = fs.readFileSync(srvConfig.CERTIFICATE_PATH, 'utf8');
    const ca = fs.readFileSync(srvConfig.CA_PATH, 'utf8');

    // Create a HTTPS server 
    // @ts-expect-error
    httpServer = https.createServer({ key: privateKey, cert: certificate, ca: ca }, app);
} else {
    // Create a HTTP server
    httpServer = http.createServer({}, app);
}

/**
 * Start http server & connect to MongoDB
 */
httpServer.listen(srvConfig.SERVER_PORT, () => {
    mongoose.connect(`${CONNECTION_TYPE}://${dbAuthString}${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_QUERY_PARAMS}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error: any) => {
        logger.error("error connect db", error);

        console.log(`Server started on port ${srvConfig.SERVER_PORT}`);
    });
});

/**
 * const wsCoinAPI = createWebSocket()
 */

/**
 * Socket.io section
 */
const io = require('socket.io')(httpServer);
io.on('connection', function (socket) {
    logger.info(`New connection: ${socket.id}`, { socket_ip: socket.id });
    SubcriberManagerInstance.createSubMapPerUser(socket.id)
    // send a message to the client
    socket.emit('hello', 'Hello!', { mr: 'john' }, Uint8Array.from([1, 2, 3, 4]));

    socket.on('method', (req: IReqMethodCall) => {
        if (req.method === 'abi' && socketABIMethod[req.method]) {
            if (req.params[0] === 'all') {
                methodRes.private(socket, {
                    method: req.method,
                    id: req.id,
                    message: 'Lấy ABI thành công',
                    result: socketABIMethod,
                })
            } else {
                methodRes.private(socket, {
                    method: req.method,
                    id: req.id,
                    message: 'Lấy ABI thành công',
                    result: socketABIMethod[req.params[0]],
                })
            }
        } else if (req.method === 'auth' && socketABIMethod[req.method]) {
            const { isValidatedRequest, messageError } = validateRequest(socket, req.params, socketABIMethod[req.method])
            // ---- 
            if (isValidatedRequest) {
                const call = methodCall[req.method]
                if (typeof call !== 'function') {
                    methodRes.error(socket, {
                        id: req.id,
                        method: req.method,
                        message: "Internal server error",
                        result: [],
                    })
                } else {
                    call(socket, socketABIMethod[req.method], req)
                }
            } else {
                methodRes.error(socket, {
                    id: req.id,
                    method: req.method,
                    message: messageError,
                    result: [],
                })
            }
        } else {
            socket.emit('method-response', { type: 'error', message: "Method sai" })
        }
        logger.info('method', req);
    });

    socket.on('message', data => {
        console.log('message', data);
    });
    const subcriber = EventInternalInstance.publiser.subscribe(({ type, data: parseData }) => {
        const [exchange, type_trade, trade_currency, ref_currency] = parseData.symbol_id.split('_')
        const { checkSubMap } = SubcriberManagerInstance

        const isCheckSubPass = checkSubMap(socket.id, `${trade_currency}/${ref_currency}`, exchange, type_trade)
        if (isCheckSubPass) {
            if (parseData.type === 'trade') {
                marketRes.trade(socket, parseData)
            } else if (parseData.type === 'qoute') {
                marketRes.qoute(socket, parseData)
            } else if (parseData.type === 'ohlcv') {
                // Dữ liệu trần sàn tham chiếu: 
                marketRes.ohlcv(socket, parseData)
            } else {}

            // console.log('match data wsCoinAPI >>>>>>>>>>>>>', parseData, socket.id);
        } else {
            // console.log("dont match: ", socket.id);
        }
    })

    socket.on('disconnect', () => {
        logger.error(`Connection left (${socket.id})`)
        // subcriber.unsubcribe()
    });
});

startListenCryptoMarketData()

const validateRequest = (socket, data, methodConfigABI) => {
    if (methodConfigABI?.input?.length !== data?.length) {
        return { messageError: "Internal server error: validateRequest failed", isValidatedRequest: false }
    } else if (false) {
        return { messageError: "Internal server error: validateRequest failed", isValidatedRequest: false }
    }

    return { messageError: "", isValidatedRequest: true }
}
