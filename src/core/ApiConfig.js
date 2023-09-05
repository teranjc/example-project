/**
 * @author Jesus Teran
 * @company Fenix
 * @version 1.0
 */

import axios from 'axios';
import { UtilFront } from '@/utilities';
import { useRouter } from 'vue-router';

import { headers, headersToken } from '@/config/headers';
import { SERVER_URL } from '@/config/server_url';

const router = useRouter();

export const instance = axios.create({
    baseURL: SERVER_URL
});

instance.interceptors.request.use((config) => {
    config.headers = headersToken();
    return config;
});

instance.interceptors.response.use(
    (response) => {
        const status = response.status;
        switch (status) {
            // bad request
            case 202: {
                return Promise.reject(response.data.detail.message ? { message: response.data.detail.message } : { message: 'bad request 202' });
            }
            default: {
                return response;
            }
        }
    },
    (error) => {
        const status = error.response ? error.response.status : 500;
        const message = error.response;
        switch (status) {
            // bad request
            case 400: {
                return Promise.reject(message.data.detail.message ? { message: message.data.detail.message } : { message: 'bad request 400' });
            }
            // authentication
            case 401: {
                UtilFront.clearSession();
                return Promise.reject({ message: 'authentication 401' });
            }
            // forbidden (permission issues)
            case 403: {
                UtilFront.clearSession();
                return Promise.reject({ message: 'forbidden (permission issues) 403' });
            }
            // not found
            case 404: {
                return Promise.reject(message.data.detail.message ? { message: message.data.detail.message } : { message: 'not found 404' });
            }
            // Method Not Allowed
            case 405: {
                return Promise.reject(message.data.detail.message ? { message: message.data.detail.message } : { message: 'Method Not Allowed 405' });
            }
            // conflict
            case 409: {
                return Promise.reject({ message: 'conflict 409' });
            }
            // not available
            case 410: {
                return Promise.reject({ message: 'not available 410' });
            }
            // unsupported media type
            case 415: {
                return Promise.reject({ message: 'unsupported media type' });
            }
            // unprocessable
            case 422: {
                return Promise.reject({ message: 'unprocessable 422' });
            }
            case 500: {
                return Promise.reject({ message: 'server 500' });
            }
            // unexpected errors
            default: {
                return Promise.reject({ message: 'unexpected errors' });
            }
        }
    }
);

export const un_instance = axios.create({
    baseURL: SERVER_URL,
    headers: headers()
});
