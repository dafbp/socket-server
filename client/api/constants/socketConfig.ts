


// export const SOCKET_SERVER = 'http://localhost:3005'
export const SOCKET_SERVER = 'http://ec2-18-136-105-202.ap-southeast-1.compute.amazonaws.com:3005'
export const IO_SOCKET_ADDRESS = 'http://io.nvdise.space'
export const RESTFUL_ADDRESS = 'http://api.nvdise.space'

export const REQ_CHANELS = {
    method: "method",
    sub: "sub",
    unsub: "unsub"
}

export const RES_CHANELS = {
    method_response: "method-response",
    market_data: "market-data",
    unsub_response: "unsub-response",
    sub_response: "sub-response"
}

export const MARKET_EVENT = {
    update_data: "update_data"
}
