
export const marketRes = {
    qoute: (sockets, result: IMarketRes, room: string) => {
        if (result.type !== 'qoute') {
            return
        }
        sockets.to(room).emit('market-data', result);
    },
    trade: (sockets, result: IMarketRes, room: string) => {
        if (result.type !== 'trade') {
            return
        }
        const verifyResult = {
            time_exchange: result.time_exchange,
            price: result.price,
            size: result.size,
            taker_side: result.taker_side,
            symbol_id: result.symbol_id,
            sequence: result.sequence,
            type: result.type,
        }
        sockets.to(room).emit('market-data', verifyResult);
    },
    ohlcv: (sockets, result: IMarketRes, room: string) => {
        if (result.type !== 'ohlcv') {
            return
        }
        sockets.to(room).emit('market-data', result);
    },
}