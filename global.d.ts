


declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.

     */
    interface IReqMethodCall {
        method: string;
        id: number,
        params: (number | string | any)[]
        
    }
    interface IResMethodCall {
        method: string;
        id: number,
        result: Object | Object[]
        message: string,
        type?: 'private' | 'success' | 'error',
    }
    
    interface IMarketRes {
        type: 'qoute' | 'trade' | 'ohlcv';
        [key: string]: string | number
    }

    type ISymbolSupport = `${string}/${string}` | 'BTC/USDT' | 'ETH/USDT'
    type IExchangeSupport = 'BINANCEUAT' | 'COINBASE'
    type ITopicTradeSupport = 'SPOT'
    type ITopicDataSupport = 'trade' | 'volume' | 'ohlcv'

    interface ISubReq {
        method: 'sub' | 'unsub';
        id: number,
        exchange: IExchangeSupport[]
        topic: ITopicDataSupport[]
        value: ISymbolSupport[]
        trade_filter: ITopicTradeSupport[]
    }

}
export { };