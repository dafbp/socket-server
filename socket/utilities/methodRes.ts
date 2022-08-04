
export const methodRes = {
    success: (socket, result: IResMethodCall) => {
        const verifyResult: IResMethodCall = {
            ...result,
            type: 'success',
            success: true,
        }

        socket.emit('method-response', verifyResult);
    },
    error: (socket, result: IResMethodCall) => {
        const verifyResult: IResMethodCall = {
            ...result,
            type: 'error',
            success: false,
        }

        socket.emit('method-response', verifyResult);
    },
    private: (socket, result: IResMethodCall) => {
        const verifyResult: IResMethodCall = {
            ...result,
            type: 'private',
            success: true,
        }

        socket.emit('method-response', verifyResult);
    }
}