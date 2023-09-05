import CryptoJS from 'crypto-js';
import { ref } from 'vue';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

const secretKey = 'mobile@20235611d2aa009a';
const keyDataUser = '14SDHVE*DSMJS*XDXADALV?$DEP--@PT4';
const secretWord = 'ERILLAMFMEDICAL2021EIFAJ\\*-*//';

export default class UtilFront {
    static loading = ref(false);
    static user = ref({});

    static isLoading() {
        return this.loading.value;
    }

    static showLoading() {
        this.loading.value = true;
    }

    static hideLoading() {
        this.loading.value = false;
    }

    static async setSession(token, user) {
        await Preferences.set({
            key: secretKey,
            value: CryptoJS.AES.encrypt(JSON.stringify(user), secretWord).toString()
        });
        await Preferences.set({
            key: keyDataUser,
            value: CryptoJS.AES.encrypt(JSON.stringify(token), secretWord).toString()
        });
    }

    static async clearSession() {
        await Preferences.remove({ key: secretKey });
        await Preferences.remove({ key: keyDataUser });
    }

    static async getSession() {
        const encryptedUser = await Preferences.get({ key: secretKey });
        if (encryptedUser.value) {
            return true;
        } else {
            return false;
        }
    }

    static async getSessionInfo() {
        if (this.getSession()) {
            const encryptedUser = await Preferences.get({ key: secretKey });
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser.value, secretWord);
            const decryptedUser = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
            if (decryptedUser) {
                return decryptedUser;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    static getUserId() {
        let user = this.getSessionInfo();
        return user.id;
    }

    static getUserName() {
        let user = this.getSessionInfo();
        return user.name + ' ' + user.last_name;
    }

    static async showNotification() {
        const notifId = await LocalNotifications.schedule({
            notifications: [
                {
                    title: 'Mi Notificación',
                    body: 'Esta es una notificación de ejemplo',
                    id: 1,
                    schedule: { at: new Date(Date.now() + 3000) }
                }
            ]
        });

        setTimeout(async () => {
            await LocalNotifications.cancel({ notifications: [{ id: notifId }] });
        }, 3000);
    }
}
