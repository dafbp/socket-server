
declare global {    
    interface ISendMsg {
        id?: number
        method: string
        params: any[]
    }

    interface IResMsg {
        id: number
        method: string
        type: 'success' | 'error' | 'private' 
        message: string
        result: any | any[]
    }

    interface IMarketDataModel {
        time_exchange: string,
        time_coinapi: string,
        uuid: string,
        price: number,
        size: number,
        taker_side: string,
        symbol_id: string,
        sequence: number,
        type: string
    }

    interface IMarketDataResponse {
        data?: IMarketDataModel,
        type?: string
    }

    type ISymbolSupport = `${string}/${string}` | 'BTC/USDT' | 'ETH/USDT'
    type IExchangeSupport = 'BINANCEUAT' | 'COINBASE'
    type ITopicTradeSupport = 'SPOT'
    type ITopicDataSupport = 'trade' | 'volume' | 'ohlcv'

    interface ISubReq {
        method: 'sub' | 'unsub';
        id?: number,
        exchange: IExchangeSupport[]
        topic: ITopicDataSupport[]
        value: ISymbolSupport[]
        trade_filter: ITopicTradeSupport[]
    }

    interface ISubMrkMsg {
        type?: string,
        msg?: {
            data: IMarketDataModel,
            type: ITopicDataSupport[]
        }
    }

}
export { };

