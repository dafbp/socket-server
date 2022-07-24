import { io, Socket } from 'socket.io-client'
import { REQ_CHANELS, SOCKET_SERVER, RES_CHANELS } from '../constants/socketConfig';

type SocketClient = null | Socket

class SocketRealTimeAPI {
    public socket: SocketClient
    public idRequest: number
    public getIdRequest: () => number
    // -----
    constructor() {
        this.socket = null
        this.idRequest = 0
        this.getIdRequest = () => {
            return this.idRequest++
        }
        this.connectSocketServer()
    }
    // -----
    public getObservable(): SocketClient {
        return this.socket;
    }
    // ------
    public connectSocketServer (): void {
        const options = {
            timeout: 2000,
            secure: true,
            reconnection: false,
            transports: ['websocket']
        }
        this.socket = io(SOCKET_SERVER, options)
        if (this.socket !== null) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> start listen"); 
            
            // -------
            this._listenSocket(this.socket)
            this._listenMainEvent()
        }
    }
    // ------
    private _listenSocket(socket: Socket): void {
        socket.on("connect", () => {
            console.log("connect", socket.id); // x8WIv7-mJelg7on_ALbx
            this._listenEngineEvent(socket)
        });

        socket.on("disconnect", (reason) => {
            console.log("disconnect", reason);
        });

        socket.on("connect_error", (err) => {
            socket.auth = (cb) => {
                cb(() => "token_for_connect")
            };
            console.log("connect_error", err);
            // socket.connect();
        });
    }
    // ---------
    private _listenEngineEvent(socket: Socket): void {
        const engine = socket.io.engine;
        console.log(engine.transport.name); // in most cases, prints "polling"

        engine.once("upgrade", () => {
            // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
            console.log(engine.transport.name); // in most cases, prints "websocket"
        });

        engine.on("packet", ({ type, data }) => {
            // called for each packet received
        });

        engine.on("packetCreate", ({ type, data }) => {
            // called for each packet sent
        });

        engine.on("drain", () => {
            // called when the write buffer is drained
        });

        engine.on("close", (reason) => {
            // called when the underlying connection is closed
        });
    }
    // -------
    public methodCall = (msg: ISendMsg) => {
        msg.id = this.getIdRequest()
        this.socket.emit(REQ_CHANELS.method, msg)
    }
    // ------- 
    private _listenMainEvent = (): void => {
        console.log("_listenMainEvent >>>>>>>>>>");
        
        this.socket.on(RES_CHANELS.method_response, (msg: IResMsg) => {
            console.log("response message", msg);
            
        })
    }
}

const SocketRealTimeAPIInstance = new SocketRealTimeAPI()
export default SocketRealTimeAPIInstance