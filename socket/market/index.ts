/**
 * TODO: Remove do không cần dùng tới nữa => Dùng socket io room
 * 
 */

interface ISubMap {
    [userId: string]: ISubMapDetail
}

export interface ISubMapDetail {
    symbol: ISymbolSupport[]
    exchange: IExchangeSupport[]
    trade_type: ITopicTradeSupport[]
}

class SubcriberManager {
    subMap: ISubMap
    checkSubMap: (socket_id: string | null, symbol: ISymbolSupport, exchange: IExchangeSupport, trade_type: ITopicTradeSupport) => boolean
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
        this.checkSubMap = (socket_id: string | null, symbol: ISymbolSupport, exchange: IExchangeSupport, trade_type: ITopicTradeSupport): boolean => {
            const userSubInfo = this.subMap[socket_id || 'default']
            // console.log("userSubInfo", userSubInfo, { socket_id, symbol, exchange, trade_type, matchSym: userSubInfo.symbol.includes(symbol), matchExch: userSubInfo.exchange.includes(exchange), matchTradeType: userSubInfo.trade_type.includes(trade_type) });

            if (!userSubInfo.symbol.includes(symbol) || !userSubInfo.exchange.includes(exchange) || !userSubInfo.trade_type.includes(trade_type)) {
                return false
            }
            return true
        }
        this.createSubMapPerUser = (socket_id: string) => {
            this.subMap[socket_id] = {
                symbol: ['BTC/USDT', 'ETH/USDT'],
                exchange: ['BINANCEUAT', 'COINBASE'],
                trade_type: ['SPOT']
            }
        }
        
    }

}

const SubcriberManagerInstance = new SubcriberManager()
export default SubcriberManagerInstance