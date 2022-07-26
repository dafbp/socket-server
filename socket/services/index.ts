import WebSocket from 'ws'

const websocketDomain = "wss://ws-sandbox.coinapi.io/v1/"

export const createWebSocket = () => {
    const ws = new WebSocket(websocketDomain);
    console.log("createWebSocket >>>>>> ", ws._url);
    return ws
}

export default {}