import { Preferences } from '@capacitor/preferences';

const key_product = 'scronosXADAL_db';

export const SET_LIST = async (state, val) => {
    state.listProducts = [...state.listProducts, val];
    await Preferences.set({
        key: key_product,
        value: JSON.stringify(state.listProducts)
    });
};

export const SET_LIST_REPLACE = (state, val) => {
    state.listProducts = val;
};

export const SET_LIST_CLEAR = async (state, val) => {
    state.listProducts = [];
    await Preferences.set({
        key: key_product,
        value: JSON.stringify([])
    });
};

export const SET_TAP_REMISSION = (state, val) => {
    state.tabRemission = val;
};

export const REMOVE_REMISSION_LIST = async (state, val) => {
    state.listProducts = state.listProducts.filter((product) => product.id !== val.id);
    // Guarda la lista actualizada en las preferencias
    await Preferences.set({
        key: key_product,
        value: JSON.stringify(state.listProducts)
    });
};
