import { methodRes } from './utilities/methodRes';

const auth = async (socket, ABI, req) => {
    console.log(req, ABI);
    
    methodRes.success(socket, {
        type: 'success',
        method: req.method,
        id: req.id,
        message: 'Đăng nhập thành công',
        result: ABI.output,
    })
}

export default {
    auth
}