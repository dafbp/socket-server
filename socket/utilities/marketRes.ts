
export const marketRes = {
    qoute: (socket, result: any) => {
        const verifyResult: IMarketRes = {
            data: result,
            type: 'qoute',
        }

        socket.emit('market-data', verifyResult);
    },
    trade: (socket, result: any) => {
        const verifyResult: IMarketRes = {
            data: result,
            type: 'trade',
        }

        socket.emit('market-data', verifyResult);
    },
}