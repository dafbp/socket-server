
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
        
        // console.log("data trade", sockets, room);
        sockets.to(room).emit('market-data', result);
    },
    ohlcv: (sockets, result: IMarketRes, room: string) => {
        if (result.type !== 'ohlcv') {
            return
        }
        sockets.to(room).emit('market-data', result);
    },
}