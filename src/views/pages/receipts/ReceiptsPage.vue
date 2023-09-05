<template>
    <v-window v-model="state.tabRemission">
        <v-window-item :key="0" :value="0">
            <ReceiptsForm />
        </v-window-item>
        <v-window-item :key="1" :value="1">
            <ReceiptsListProducts />
        </v-window-item>
    </v-window>
    <div>
        <v-bottom-navigation class="bottom_navigation" color="#5D87FF" app :elevation="7" grow :value="state.tabRemission">
            <v-btn value="0" @click="setTab(0)">
                <v-icon>mdi mdi-barcode</v-icon>
                Capturar
            </v-btn>

            <v-btn value="1" @click="setTab(1)">
                <v-icon>mdi-format-list-numbered</v-icon>
                Lista
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ReceiptsForm from '@/views/pages/receipts/ReceiptsForm.vue';
import ReceiptsListProducts from '@/views/pages/receipts/ReceiptsListProducts.vue';
import { useStore } from 'vuex';
import { Preferences } from '@capacitor/preferences';
import { Dialog } from '@capacitor/dialog';
import { toastController } from '@ionic/vue';
import { listOutline } from 'ionicons/icons';
const key_product = ref('scronosXADAL_db');

const store = useStore();
const state = store.state.remission;

const setTab = (value) => {
    store.commit('remission/SET_TAP_REMISSION', value);
};

const alertToast = async (message, icon) => {
    const toast = await toastController.create({
        message: message,
        duration: 2500,
        position: 'top',
        icon: icon
    });
    await toast.present();
};

onMounted(async () => {
    const list_temporal_value = await Preferences.get({ key: key_product.value });

    const list_temporal_json = JSON.parse(list_temporal_value.value);

    if (list_temporal_json !== null && list_temporal_json.length > 0) {
        await Dialog.alert({
            title: 'Aviso.',
            message: `Se encontro un registro de recibo pendiente.`,
            buttonTitle: 'Si, confirmar.'
        });
        alertToast('Producto encontrado.', listOutline);
        store.commit('remission/SET_LIST_REPLACE', list_temporal_json);
    }
});
</script>

<style scoped>
.bottom_navigation {
    border-top: 1px solid #ced4da !important;
    box-shadow: none !important;
}
.badge .v-badge__badge {
    border-radius: 20px;
    color: #fff;
    font-size: 13px;
    height: 16px;
    letter-spacing: 0;
    min-width: 16px;
    padding: 2px 6px;
    pointer-events: auto;
    position: absolute;
    text-align: center;
    text-indent: 0;
    top: auto;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    white-space: nowrap;
}
</style>
