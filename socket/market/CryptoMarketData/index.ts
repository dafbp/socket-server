import { marketRes } from '../../../socket/utilities/marketRes';
import WebSocket from 'ws'
import SubcriberManagerInstance from '../index';
import EventInternalInstance from '../../event/index';
import svrConfig from '../../../config'
import logger from '../../../logger'

const websocketDomain = ["wss://ws-sandbox.coinapi.io/v1/", "wss://ws.coinapi.io/v1/"]

export const createWebSocket = () => {
    const ws = new WebSocket(websocketDomain[1]);
    logger.info(`createWebSocket >>>>>> ${ws._url} api_key: ${svrConfig.COINAPI_KEY} env: ${process.env.ENV}`)
    return ws
}

export const startListenCryptoMarketData = () => {
    // -------
    const exampleCall = {
        type: 'hello',
        apikey: svrConfig.COINAPI_KEY,
        heartbeat: false,
        subscribe_data_type: ['trade', 'ohlcv'],
        subscribe_filter_asset_id: ["BTC/USDT", "ETH/USDT"],
        subscribe_filter_symbol_id: ["COINBASE", "BINANCEUAT", "BINANCE", "FTX", "HOUBIPRO"],
        subscribe_filter_period_id: ["1DAY"]
    };
    const test = {
        "type": "hello",
        "apikey": "5916EF4A-BBD8-4583-9B2C-D7385AAA99CB",
        "heartbeat": false,
        "subscribe_data_type": ["trade", "ohlcv"],
        "subscribe_filter_asset_id": ["BTC/USDT", "ETH/USDT"],
        "subscribe_filter_symbol_id": ["COINBASE", "BINANCEUAT", "BINANCE", "FTX", "HOUBIPRO"],
        "subscribe_filter_period_id": ["1DAY"]
    }

    const wsCoinAPI = createWebSocket()
    wsCoinAPI.on('open', function open() {
        logger.info(`New connection to wsCoinAPI`)
        wsCoinAPI.send(JSON.stringify(exampleCall));
    });

    wsCoinAPI.on('message', function incoming(data) {
        // console.log("message", data);
        
        const parseData = JSON.parse(data.toString())
        EventInternalInstance.publiser.next({ type: 'rx-market', data: parseData })

        // const [exchange, type_trade, trade_currency, ref_currency] = parseData.symbol_id.split('_')
        // const { checkSubMap } = SubcriberManagerInstance

        // const isCheckSubPass = checkSubMap(socket.id, `${trade_currency}/${ref_currency}`, exchange, type_trade)
        // if (isCheckSubPass) {
        //     marketRes.qoute(socket, parseData)
        //     console.log('match data wsCoinAPI >>>>>>>>>>>>>', parseData, socket.id);
        // } else {
        //     console.log("dont match: ", data.toString(), socket.id);
        // }


    });
    wsCoinAPI.on('error', (error) => {
        logger.error(`wsCoinAPI error ${JSON.stringify(error)}`)
    })
    wsCoinAPI.on('close', (close) => {
        logger.error(`wsCoinAPI close ${JSON.stringify(close)}`)
    })
}
export default {}
