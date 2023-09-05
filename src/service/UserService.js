import { instance, un_instance } from '@/core/ApiConfig.js';

const LOGIN_USER = 'login';
export default class UserService {
    loginUser = (payload) => {
        return un_instance.post(LOGIN_USER, payload);
    };

    getUser() {
        return fetch('data/user.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
