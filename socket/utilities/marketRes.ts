
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
            // sequence: result.sequence,
            type: result.type,
        }
        sockets.to(room).emit('market-data', verifyResult);
    },
    tradeOnlyUser: (socket, result: IMarketRes) => {
        if (result.type !== 'trade') {
            return
        }
        const verifyResult = {
            time_exchange: result.time_exchange,
            price: result.price,
            size: result.size,
            taker_side: result.taker_side,
            symbol_id: result.symbol_id,
            // sequence: result.sequence,
            type: result.type,
        }
        socket.emit('market-data', verifyResult);
    },
    ohlcv: (sockets, result: IMarketRes, room: string) => {
        if (result.type !== 'ohlcv') {
            return
        }
        const verifyResult = {
            period_id: result.period_id,
            time_period_start: result.time_period_start,
            time_period_end: result.time_period_end,
            time_open: result.time_open,
            time_close: result.time_close,
            price_open: result.price_open,
            price_high: result.price_high,
            price_low: result.price_low,
            price_close: result.price_close,
            volume_traded: result.volume_traded,
            trades_count: result.trades_count,
            symbol_id: result.symbol_id,
            // sequence: result.sequence,
            type: result.type
        }
        sockets.to(room).emit('market-data', verifyResult);
    },
    ohlcvOnlyUser: (socket, result: IMarketRes) => {
        if (result.type !== 'ohlcv') {
            return
        }
        const verifyResult = {
            period_id: result.period_id,
            time_period_start: result.time_period_start,
            time_period_end: result.time_period_end,
            time_open: result.time_open,
            time_close: result.time_close,
            price_open: result.price_open,
            price_high: result.price_high,
            price_low: result.price_low,
            price_close: result.price_close,
            volume_traded: result.volume_traded,
            trades_count: result.trades_count,
            symbol_id: result.symbol_id,
            // sequence: result.sequence,
            type: result.type
        }
        socket.emit('market-data', verifyResult);
    },
}