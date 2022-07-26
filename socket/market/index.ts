

interface ISubMap {
    [userId: string]: ISubMapDetail
}

export interface ISubMapDetail {
    symbol: ISymbolList[]
    exchange: IExchangeList[]
    trade_type: ITradeTypeList[]
}

export type ISymbolList = `${string}/${string}` | 'BTC/USDT' | 'ETH/USDT'
export type IExchangeList = 'BINANCEUAT' | 'COINBASE'
export type ITradeTypeList = 'SPOT'


class SubcriberManager {
    subMap: ISubMap
    checkSubMap: (socket_id: string | null, symbol: ISymbolList, exchange: IExchangeList, trade_type: ITradeTypeList) => boolean
    createSubMapPerUser: (socket_id: string) => void
    // -------
    constructor() {
        this.subMap = {
            'default': {
                symbol: ['BTC/USDT'],
                exchange: ['BINANCEUAT', 'COINBASE'],
                trade_type: ['SPOT']
            }
        }
        this.checkSubMap = (socket_id: string | null, symbol: ISymbolList, exchange: IExchangeList, trade_type: ITradeTypeList): boolean => {
            const userSubInfo = this.subMap[socket_id || 'default']
            console.log("userSubInfo", userSubInfo, { socket_id, symbol, exchange, trade_type, matchSym: userSubInfo.symbol.includes(symbol), matchExch: userSubInfo.exchange.includes(exchange), matchTradeType: userSubInfo.trade_type.includes(trade_type) });

            if (!userSubInfo.symbol.includes(symbol) || !userSubInfo.exchange.includes(exchange) || !userSubInfo.trade_type.includes(trade_type)) {
                return false
            }
            return true
        }
        this.createSubMapPerUser = (socket_id: string) => {
            this.subMap[socket_id] = {
                symbol: ['BTC/USDT'],
                exchange: ['BINANCEUAT', 'COINBASE'],
                trade_type: ['SPOT']
            }
        }
        
    }

}

const SubcriberManagerInstance = new SubcriberManager()
export default SubcriberManagerInstance