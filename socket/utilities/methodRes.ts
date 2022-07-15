
export const methodRes = {
    success: (socket, result: IResMethodCall) => {
        const verifyResult: IResMethodCall = {
            ...result,
            type: 'success',
        }

        socket.emit('method-response', verifyResult);
    },
    error: (socket, result: IResMethodCall) => {
        const verifyResult: IResMethodCall = {
            ...result,
            type: 'error',
        }

        socket.emit('method-response', verifyResult);
    },
    private: (socket, result: IResMethodCall) => {
        const verifyResult: IResMethodCall = {
            ...result,
            type: 'private',
        }

        socket.emit('method-response', verifyResult);
    }
}