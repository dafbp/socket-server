
declare global {    
    interface ISendMsg {
        id?: number
        method: string
        params: any[]
    }
    interface IResMsg {
        id: number
        method: string
        type: 'success' | 'error' | 'private' 
        message: string
        result: any | any[]
    }
}
export { };

