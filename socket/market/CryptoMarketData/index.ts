import { marketRes } from '../../../socket/utilities/marketRes';
import WebSocket from 'ws'
import SubcriberManagerInstance from '../index';
import EventInternalInstance from '../../event/index';

const websocketDomain = "wss://ws-sandbox.coinapi.io/v1/"

export const createWebSocket = () => {
    const ws = new WebSocket(websocketDomain);
    console.log("createWebSocket >>>>>> ", ws._url);
    return ws
}

export const startListenCryptoMarketData = () => {
    // -------
    const exampleCall = {
        type: 'hello',
        apikey: '9FA323AE-5E94-4087-9AF4-EBBA6326297C',
        heartbeat: false,
        subscribe_data_type: ['trade'],
        subscribe_filter_asset_id: ["BTC/USDT", "ETH/USDT"],
        subscribe_filter_symbol_id: ["COINBASE", "BINANCEUAT"]
    };
    const test = {
        "type": "hello",
        "apikey": "9FA323AE-5E94-4087-9AF4-EBBA6326297C",
        "heartbeat": false,
        "subscribe_data_type": ["trade"],
        "subscribe_filter_asset_id": ["BTC/USDT", "ETH/USDT"],
        "subscribe_filter_symbol_id": ["COINBASE", "BINANCEUAT"]
    }

    const wsCoinAPI = createWebSocket()
    wsCoinAPI.on('open', function open() {
        console.log("New connection to wsCoinAPI")
        wsCoinAPI.send(JSON.stringify(exampleCall));
    });

    wsCoinAPI.on('message', function incoming(data) {
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
}
export default {}
