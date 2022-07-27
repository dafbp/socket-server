
export const marketRes = {
    qoute: (sockets, result: any, room: string) => {
        const verifyResult: IMarketRes = {
            data: result,
            type: 'qoute',
        }
        sockets.to(room).emit('market-data', verifyResult);
    },
    trade: (sockets, result: any, room: string) => {
        const verifyResult: IMarketRes = {
            data: result,
            type: 'trade',
        }
        
        // console.log("data trade", sockets, room);
        sockets.to(room).emit('market-data', verifyResult);
    },
    ohlcv: (sockets, result: any, room: string) => {
        const verifyResult: IMarketRes = {
            data: result,
            type: 'ohlcv',
        }

        sockets.to(room).emit('market-data', verifyResult);
    },
}