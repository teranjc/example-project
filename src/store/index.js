import { createStore } from 'vuex'; // Importa createStore en lugar de "Vuex"
import auth from "./modules/auth";
import remission from "./modules/remission";

const store = createStore({
  modules: {
    // Session
    auth: auth,
    remission: remission,
  },
});

export default store;
