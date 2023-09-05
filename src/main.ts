import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import store from './store'; // Importa el store
import Toast from 'vue-toastification';
import { IonicVue } from '@ionic/vue';

import 'vue-toastification/dist/index.css';
import Loading from '@/layouts/loading/Loading.vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
//import '@ionic/vue/css/structure.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';

const options = {
    pauseOnFocusLoss: false,
    maxToasts: 3,
    timeout: 5068,
    position: 'top-center'
};

// Crea la aplicación
const app = createApp(App)
    .use(router) // Usa tu instancia de Vue Router
    .use(IonicVue);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.component('Loading', Loading);
app.use(Toast, options);
app.use(store); // Usa el store Vuex
app.use(VueApexCharts);
app.use(vuetify).mount('#app');
