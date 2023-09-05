import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'scronos',
    webDir: 'dist',
    bundledWebRuntime: false,
    server: {
        androidScheme: 'http'
    },
    plugins: {
        LocalNotifications: {
            smallIcon: 'ic_stat_icon_config_sample',
            iconColor: '#488AFF',
            sound: 'beep.wav'
        }
    }
};

export default config;
