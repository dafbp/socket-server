
export const methodRes = {
    success: (socket, result) => {
        const verifyResult = {
            ...result,
            type: 'success',
        }

        socket.emit('method-response', result);
    },
    error: (socket, result) => {
        const verifyResult = {
            ...result,
            type: 'error',
        }

        socket.emit('method-response', result);
    }
}