<script setup>
import { ref, computed } from 'vue';
import ReceiptsService from '@/service/ReceiptsService';
import { useStore } from 'vuex';
import { Dialog } from '@capacitor/dialog';
import { toastController } from '@ionic/vue';
import { qrCodeOutline, documentAttachOutline, closeCircleOutline } from 'ionicons/icons';

/* Vuex */
const store = useStore();
const state = store.state.remission;
const number = ref(0.53);
const getDimesion = ref(window.innerHeight);
const dialog = ref(false);
const refReceipt = ref('');
const refReceiptInfo = ref({});
const receiptsService = new ReceiptsService();
const getQuantity = (box, box_off, quantity) => {
    return parseInt(box) * parseInt(box_off) + parseInt(quantity);
};

const getNumber = computed(() => {
    return number.value;
});

const alertToast = async (message, icon) => {
    const toast = await toastController.create({
        message: message,
        duration: 3000,
        position: 'top',
        icon: icon
    });
    await toast.present();
};

const removeProduct = async (item) => {
    const { value } = await Dialog.confirm({
        okButtonTitle: 'Si, eliminar.',
        cancelButtonTitle: 'Cancelar.',
        title: 'Eliminación',
        message: `Producto: ${item.name} Cantidad total: ${getQuantity(item.box, item.box_off, item.quantity)}`
    });
    if (!value) return;
    //toast.success('Producto eliminado.');
    alertToast('Producto eliminado.', closeCircleOutline);
    store.commit('remission/REMOVE_REMISSION_LIST', item);
};

const getReference = async () => {
    if (!refReceipt.value) alertToast('Debes de agregar una referencia.', qrCodeOutline);
    if (refReceipt.value == '009123788713') {
        refReceiptInfo.value.id = 'REM-29375';
        refReceiptInfo.value.user = 'DIANA PAULINA PEÑA RODRIGUEZ';
        refReceiptInfo.value.type = 'Recibo';
        refReceiptInfo.value.supplier = 'COMERCIALIZADORA DE PRODUCTOS INSTITUCIONALES S.A. DE C.V.';
        refReceiptInfo.value.date = '26/08/2023 16:55';
        refReceiptInfo.value.pedido = 'OC00048 - LA-914010985-E5-2022';
        alertToast('Referencia encontrada.', documentAttachOutline);
    } else {
        alertToast('No se encontró ninguna referencia.', documentAttachOutline);
    }
};

const clearBarcode = () => {
    refReceiptInfo.value = {};
    refReceipt.value = '';
};

const openModal = async () => {
    refReceiptInfo.value = {};
    refReceipt.value = '';
    dialog.value = true;
};

const saveReceipts = async () => {
    const { value } = await Dialog.confirm({
        okButtonTitle: 'Si, guardar.',
        cancelButtonTitle: 'Cancelar.',
        title: 'Guardar',
        message: `Guardar referencia: ${refReceipt.value} `
    });
    if (!value) return;
    dialog.value = false;
};
</script>

<template>
    <v-row>
        <v-col cols="12" class="pt-5">
            <v-card class="mx-auto menu_items_details" variant="outlined">
                <div class="card-header text-center">
                    <v-list-item title="Lista de productos">
                        <template v-slot:append>
                            <v-badge color="info" :content="state.listProducts.length" inline></v-badge>
                        </template>
                    </v-list-item>
                </div>
                <div v-if="state.listProducts.length == 0">
                    <v-divider class="border-opacity-100" color="info"></v-divider>
                    <div class="text-center pt-8 pb-8">
                        <h5>Sin productos</h5>
                    </div>
                </div>
                <div v-else>
                    <v-virtual-scroll :items="state.listProducts" :height="getDimesion * getNumber + 'px'" item-height="60">
                        <template v-slot:default="{ item, index }">
                            <v-divider class="border-opacity-100" color="info"></v-divider>

                            <v-list-item class="pl-3">
                                <template v-slot:prepend>
                                    <v-avatar :color="'#5D87FF'" style="color: white" class="mr-3" size="26">
                                        <span>{{ index + 1 }}</span>
                                    </v-avatar>
                                </template>
                                <v-list-item-title style="max-width: 220px; overflow: hidden" class="pb-0"
                                    ><span>{{ item.name }}</span></v-list-item-title
                                >
                                <v-list-item-title style="max-width: 230px; overflow: hidden" class="pb-0">
                                    Cant. Total:
                                    <strong>{{ getQuantity(item.box, item.box_off, item.quantity) }}</strong>
                                    | Clave:
                                    <strong>{{ item.health_sector_key }}</strong>
                                </v-list-item-title>
                                <v-list-item-title>
                                    <i class="mdi mdi-barcode mr-1"></i> EAN:
                                    <strong>{{ item.barcode }}</strong>
                                </v-list-item-title>
                                <template v-slot:append>
                                    <v-btn
                                        @click="removeProduct(item)"
                                        icon="mdi-delete-outline"
                                        style="color: white; background-color: #fa896b"
                                        size="x-small"
                                        variant="tonal"
                                    ></v-btn>
                                </template>
                            </v-list-item>
                        </template>
                    </v-virtual-scroll>
                </div>
            </v-card>
        </v-col>
        <v-col v-if="!state.listProducts.length == 0" cols="12" class="pt-0">
            <v-btn @click="openModal()" size="large" style="color: white; background-color: #13deb9" dark block> Guardar </v-btn>
        </v-col>
        <v-dialog persistent v-model="dialog" fullscreen transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Confirmación</v-toolbar-title>
                    <v-toolbar-items>
                        <v-btn v-if="refReceiptInfo.id" variant="text" @click="saveReceipts()"> Guardar </v-btn>
                        <v-btn v-if="!refReceiptInfo.id" variant="text" @click="getReference()"> Buscar </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list lines="two" subheader>
                    <v-list-subheader><b>Total de productos: </b>{{ state.listProducts?.length }}</v-list-subheader>
                    <v-list-item
                        title="Referencia"
                        subtitle="A continuación se debé de agregar la referencia del recibo y confirmar la información de la misma."
                    ></v-list-item>
                    <v-col cols="12">
                        <form @submit.prevent="getReference()">
                            <v-text-field
                                v-model="refReceipt"
                                hide-details
                                variant="outlined"
                                append-inner-icon="mdi mdi-qrcode"
                                type="text"
                                clearable
                                :disabled="refReceiptInfo?.id"
                                clear-icon="mdi mdi-close-circle-outline"
                                :error-messages="errors"
                                label="Referencia"
                                required
                            ></v-text-field>
                        </form>
                    </v-col>
                    <v-col cols="12" v-if="refReceiptInfo.id" class="pt-0">
                        <div class="menu_items_details">
                            <div class="v-card-item">
                                <div class="v-card-item__content">
                                    <div class="d-flex align-center pb-3">
                                        <div
                                            class="v-avatar v-theme--BLUE_THEME v-avatar--density-default rounded-md v-avatar--variant-flat"
                                            style="width: 64px; height: 64px"
                                        >
                                            <img src="@/assets/images/wms/lista.png" /><span class="v-avatar__underlay"></span>
                                        </div>
                                        <div class="pl-5">
                                            <v-list-item-title
                                                ><i class="mdi mdi-text-box-check-outline mr-1"></i>ID Recibo:
                                                {{ refReceiptInfo.id }}</v-list-item-title
                                            >
                                            <v-list-item-subtitle
                                                ><i class="mdi mdi-calendar-range mr-1"></i>Fecha de creación:
                                                {{ refReceiptInfo.date }}</v-list-item-subtitle
                                            >
                                        </div>
                                    </div>
                                    <div class="d-flex align-center">
                                        <div class="col-12">
                                            <v-list-item-subtitle
                                                ><i class="mdi mdi-account-outline mr-1"></i>Generado por:
                                                {{ refReceiptInfo.user }}</v-list-item-subtitle
                                            >
                                            <v-list-item-subtitle>
                                                <i class="mdi mdi-file-arrow-up-down-outline mr-1"></i> Pedido: {{ refReceiptInfo.pedido }}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                <i class="mdi mdi-package-variant-closed mr-1"></i> Proveedor: {{ refReceiptInfo.supplier }}
                                            </v-list-item-subtitle>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" v-if="refReceiptInfo.id">
                        <v-btn size="large" style="color: white; background-color: #fa896b" dark block @click="clearBarcode" class="mt-n2">
                            Cancelar
                        </v-btn>
                    </v-col>
                </v-list>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<style>
.v-list-item-subtitle {
    font-size: 0.775rem !important;
}

.v-list-item-title {
    font-size: 13px !important;
    line-height: 1.1rem !important;
}
</style>
