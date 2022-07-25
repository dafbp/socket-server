


declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.

     */
    interface IReqMethodCall {
        method: string;
        id: number,
        params: (number | string | any)[]
        
    }
    interface IResMethodCall {
        method: string;
        id: number,
        result: Object | Object[]
        message: string,
        type?: 'private' | 'success' | 'error',
    }
    
    interface IMarketRes {
        type: 'qoute';
        data: any
    }

}
export { };