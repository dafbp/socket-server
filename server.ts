
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
// import SubcriberManagerInstance from './socket/market/index';
import EventInternalInstance from './socket/event';
import logger from './logger';
import { MarketDataCache } from './socket/market/memoryCache/index';

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
    // mongoose.connect(`${CONNECTION_TYPE}://${encodeURIComponent(dbAuthString)}${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_QUERY_PARAMS}`, {
    mongoose.connect(`mongodb+srv://admin:admin123@cluster0.neny7az.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (error: any) => {
        logger.error(`error connect db ${JSON.stringify(error)}`);

        console.log(`Server started on port ${srvConfig.SERVER_PORT}`);
    });
});
// console.log("dbAuthString", dbAuthString, `${CONNECTION_TYPE}://${encodeURIComponent(dbAuthString)}${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_QUERY_PARAMS}`);


/**
 * const wsCoinAPI = createWebSocket()
 */

/**
 * Socket.io section
 */

const DEFAULT_ROOM_MARKET = [
    // "BINANCEUAT_SPOT_BTC_USDT",
    // "BINANCEUAT_SPOT_ETH_USDT",
    // "BINANCE_SPOT_BTC_USDT",
    // "BINANCE_SPOT_ETH_USDT",
    // "COINBASE_SPOT_BTC_USDT",
    // "COINBASE_SPOT_ETH_USDT",
]


const io = require('socket.io')(httpServer);
io.on('connection', function (socket) {
    logger.info(`New connection: ${socket.id}`, { socket_ip: socket.id });
    // console.log("list socket: io.sockets", io.sockets.size, io.sockets);
    // ---- join room by default
    DEFAULT_ROOM_MARKET.forEach((room) => socket.join(room))
    
    // SubcriberManagerInstance.createSubMapPerUser(socket.id)
    // -------- Method and service call
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
        } else if (socketABIMethod[req.method]) {
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
        // console.log('message', data);
    });

    socket.on('sub', (subInfo: ISubReq) => {
        console.log('sub', subInfo);
        if (subInfo.method === 'sub') {
            if (typeof subInfo.id !== 'number') {
                socket.emit('sub-response', { type: 'error', message: "Sub thất bại: Thiếu id ", info: subInfo, id: subInfo.id })
            } else {
                socket.emit('sub-response', { type: 'success', message: "Sub thành công ", info: subInfo, id: subInfo.id })
                // ---- join room
                const symbol_ids = subInfo.symbol_ids || []
                if (symbol_ids.length) {
                    symbol_ids.forEach((room) => socket.join(room))
                }
                // ------- Bắn data đã cache trước đó
                if (symbol_ids.length) {
                    symbol_ids.forEach((room) => {
                        const lastMessage = MarketDataCache[room]
                        if (JSON.stringify(lastMessage.trade) !== '{}') {
                            // @ts-expect-error
                            marketRes.tradeOnlyUser(socket, lastMessage.trade)
                        }
                        if (JSON.stringify(lastMessage.ohlcv['12HRS']) !== '{}') {
                             // @ts-expect-error
                            marketRes.ohlcvOnlyUser(socket, lastMessage.ohlcv['12HRS'])
                        }
                        if (JSON.stringify(lastMessage.ohlcv['1DAY']) !== '{}') {
                             // @ts-expect-error
                            marketRes.ohlcvOnlyUser(socket, lastMessage.ohlcv['1DAY'])
                        }
                        if (JSON.stringify(lastMessage.ohlcv['1HRS']) !== '{}') {
                             // @ts-expect-error
                            marketRes.ohlcvOnlyUser(socket, lastMessage.ohlcv['1HRS'])
                        }
                    })
                }
            }
        } else {
            socket.emit('sub-response', { type: 'error', message: "Sub thất bại: Sai method ", info: subInfo, id: subInfo.id })
        }
        
    });
    socket.on('unsub', (unsubInfo: ISubReq) => {
        console.log('unsub', unsubInfo);
        if (unsubInfo.method === 'unsub') {
            if (typeof unsubInfo.id !== 'number') {
                socket.emit('unsub-response', { type: 'error', message: "unsub thất bại: thiếu id ", info: unsubInfo, id: unsubInfo.id })
            } else {
                socket.emit('unsub-response', { type: 'success', message: "unsub thành công ", info: unsubInfo, id: unsubInfo.id })
                // ---- leave room
                const symbol_ids = unsubInfo.symbol_ids || []
                if (symbol_ids.length) {
                    symbol_ids.forEach((room) => socket.leave(room))
                }
            }
        } else {
            socket.emit('unsub-response', { type: 'error', message: "unsub thất bại: Sai method ", info: unsubInfo, id: unsubInfo.id })
        }
    });
    socket.on('rooms', (rooms: any) => {
        socket.emit('rooms-response', { type: 'success', message: "Get room ok!", results: Array.from(socket.rooms.values()) })
    });
    socket.on('logs', (logRequestInfo: any) => {
        if (logRequestInfo.token !== '123456') {
            socket.emit('logs-response', {
                method: logRequestInfo.method,
                message: "Access Token failed"
            })
            return
        }
        if (logRequestInfo.method === 'list_symbol_ids') {
            socket.emit('logs-response', {
                method: logRequestInfo.method,
                message: "OK",
                results: Object.keys(MarketDataCache)
            })
        } else if (logRequestInfo.method === 'list_symbol_ids_details') {
            socket.emit('logs-response', {
                method: logRequestInfo.method,
                message: "OK",
                results: MarketDataCache
            })
        }

    })

    socket.on('disconnect', () => {
        logger.error(`Connection left (${socket.id})`)
        // subcriber.unsubcribe()
    });
});

const subcriber = EventInternalInstance.publiser.subscribe(({ type, data: parseData }) => {
    // const [exchange, type_trade, trade_currency, ref_currency] = parseData.symbol_id.split('_')
    // const { type: typeTopic }: { type: ITopicDataSupport} = parseData
    
    if (parseData.type === 'trade') {
        // -- Giữ liệu giá thị trường Realtime
        marketRes.trade(io.sockets, parseData, parseData.symbol_id)
    } else if (parseData.type === 'qoute') {
        marketRes.qoute(io.sockets, parseData, parseData.symbol_id)
    } else if (parseData.type === 'ohlcv') {
        // Dữ liệu trần sàn tham chiếu:
        marketRes.ohlcv(io.sockets, parseData, parseData.symbol_id)
    } else { }

})


io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});

io.of("/").adapter.on("delete-room", (room) => {
    console.log(`room ${room} was delete`);
});

io.of("/").adapter.on("leave-room", (room, id) => {
    console.log(`socket ${id} has leave room ${room}`);
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
