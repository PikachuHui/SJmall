import { Storage } from './localStorage'

export default {
    // 服务器IP
    SERVER_IP: 'https://www.easy-mock.com/mock/5c9441d48e9d1050205520bd/sjmall',
    isLogin: function () {
        return JSON.parse(Storage.get("is_login")[0][0])
    }
}