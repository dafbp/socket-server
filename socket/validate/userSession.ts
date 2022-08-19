/**
 * User sẽ login theo connection
 * 
 */


class UserSessionMapClass {
    setUserSession: (socketId: string, info: any) => void;
    removeUserSession: (socketId: string) => void;
    getUserSession: (socketId: string) => any;
    // ------
    constructor() {
        this.setUserSession = (socketId: string, info: any) => {
            this[socketId] = new UserSessionInfo()
            this[socketId].jwt = info.jwt
            this[socketId].token = info.token
            this[socketId].auth = info.auth
        }
        this.removeUserSession = (socketId: string) => {
            if (this[socketId]) delete this[socketId]
        }
        this.getUserSession = (socketId: string) => {
            return this[socketId]
        }
    }

}
export const UserSessionMap = new UserSessionMapClass()


class UserSessionInfo {
    jwt: {};
    token: string;

    constructor() {
        this.jwt = {}
        this.token = ''
    }
}