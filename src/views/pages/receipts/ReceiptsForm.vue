<script setup>
import { ref, onMounted } from 'vue';
import ReceiptsService from '@/service/ReceiptsService';
import { useStore } from 'vuex';
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast';
import { Keyboard } from '@capacitor/keyboard';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from 'vue-toastification';
import { toastController } from '@ionic/vue';
import { UtilFront } from '@/utilities';
import { listOutline, searchCircleOutline } from 'ionicons/icons';

const store = useStore();
const get_product_disabled = ref(false);
const action = ref(0);
const validEan = ref(false);
const lots_expiration = ref([]);
const receiptsService = new ReceiptsService();
const lot_list = ref([]);
const fiscal_found_list = ref([]);
const toast = useToast();

const product = ref({
    barcode: ''
});

const productAdd = ref({
    barcode: '',
    fiscal_found: null,
    lot_fiscal_found: null,
    box_off: '',
    box: '',
    quantity: ''
});

const clearForm = () => {
    productAdd.value = {
        barcode: '',
        fiscal_found: null,
        lot_fiscal_found: null,
        box_off: '',
        box: '',
        quantity: ''
    };
    product.value = {
        barcode: ''
    };
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

const hideKeyboard = () => {
    Keyboard.hide();
};

const setInfoProduct = async () => {
    const { value } = await Dialog.confirm({
        okButtonTitle: 'Si, guardar.',
        cancelButtonTitle: 'Cancelar.',
        title: 'Guardar',
        message: `Producto: ${product.value.name} Cantidad total: ${getQuantity(
            productAdd.value.box,
            productAdd.value.box_off,
            productAdd.value.quantity
        )}`
    });
    if (!value) return;

    try {
        let payload = {
            id: uuidv4(),
            name: product.value.name,
            id_product: product.value.id_product,
            barcode: product.value.barcode,
            short_description: product.value.short_description,
            box_off: productAdd.value.box_off,
            health_sector_key: product.value.ssa_key.health_sector_key,
            box: productAdd.value.box,
            quantity: productAdd.value.quantity,
            lot: productAdd.value.lot_fiscal_found
        };

        store.commit('remission/SET_LIST', payload);
        get_product_disabled.value = false;
        action.value = 0;
        clearForm();
        validEan.value = false;
        store.commit('remission/SET_TAP_REMISSION', 1);
        //toast.success('Producto agregado correctamente.');
        alertToast('Producto agregado correctamente.', listOutline);
    } catch (error) {
        await Toast.show({
            text: error.message
        });
    }
};

const getQuantity = (box, box_off, quantity) => {
    return parseInt(box) * parseInt(box_off) + parseInt(quantity);
};

const get_product = (e) => {
    e.preventDefault();
    getProductoBarcode(product.value.barcode);
};

const clearBarcode = () => {
    product.value.barcode = '';
    get_product_disabled.value = false;
    validEan.value = false;
};

const get_lot_fiscal_founds = async () => {
    productAdd.value.lot_fiscal_found = null;
    if (productAdd.value.fiscal_found == null) {
        lot_list.value = [];
        return;
    }
    try {
        const payload = {
            fiscal_fund_id: productAdd.value.fiscal_found
        };
        const res = await receiptsService.get_lot_fiscal_found(payload);
        lot_list.value = res.data.data;
    } catch (e) {
        console.log('lot_fiscal_found: ' + e.message);
    }
};

const get_fiscal_found = async () => {
    try {
        const res = await receiptsService.get_fiscal_found();
        fiscal_found_list.value = res.data.data;
    } catch (e) {
        console.log('fiscal_found: ' + e.message);
    }
};

const getProductoBarcode = async (value) => {
    try {
        UtilFront.showLoading();

        const payload = {
            barcode: value
        };

        const response = await receiptsService.get_product_barcode(payload);
        const { data } = response;

        if (data.data !== null) {
            action.value = 1;
            validEan.value = true;
            product.value = data.data;
            product.value.id_product_lot_expiration = null;
            lots_expiration.value = data.data.lots_expiration;
            get_product_disabled.value = true;
            hideKeyboard();
            alertToast('Producto encontrado.', searchCircleOutline);
            //toast.success('Producto encontrado.');
        } else {
            get_product_disabled.value = false;
            action.value = 0;
            clearForm();
            toast.warning('Producto no encontrado.');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        UtilFront.hideLoading();
    }
};

onMounted(() => {
    get_fiscal_found();
    window.addEventListener('keyup', (ev) => {
        if (ev.code === 'F16' || ev.code === 'F9') {
            const input = document.getElementById('barcode_botton');
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
            hideKeyboard();
        }
    });
});
</script>

<template>
    <v-row>
        <v-col cols="12" class="pt-5 pb-0" v-show="get_product_disabled">
            <div class="menu_items_details">
                <div class="v-card-item">
                    <div class="v-card-item__content">
                        <div class="d-flex align-center pb-2">
                            <div
                                class="v-avatar v-theme--BLUE_THEME v-avatar--density-default rounded-md v-avatar--variant-flat"
                                style="width: 64px; height: 64px"
                            >
                                <img src="@/assets/images/wms/frasco-de-pastillas.png" /><span class="v-avatar__underlay"></span>
                            </div>
                            <div class="pl-5">
                                <h5>Clave: {{ product.ssa_key?.health_sector_key }}</h5>
                                <h5>Registro Sanitario: {{ product.health_register }}</h5>
                            </div>
                        </div>
                        <div class="d-flex align-center">
                            <div class="col-12">
                                <h5>{{ product.name }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-col>
        <v-col cols="12" v-bind:class="[validEan ? 'pb-0' : 'pt-7']">
            <form @submit.prevent="get_product">
                <v-row align="center">
                    <v-col :cols="validEan ? 8 : 12">
                        <v-text-field
                            dark
                            id="barcode_botton"
                            type="text"
                            :class="[validEan ? '' : 'ean-product']"
                            autocomplete="off"
                            hide-details
                            append-inner-icon="mdi mdi-barcode"
                            variant="outlined"
                            v-model="product.barcode"
                            :disabled="validEan"
                            label="EAN"
                        ></v-text-field>
                    </v-col>
                    <v-col class="pl-1 pt-4" cols="4">
                        <template v-if="get_product_disabled">
                            <v-btn style="color: white; background-color: #fa896b" dark @click="clearBarcode" class="mt-n2">
                                Cancelar
                            </v-btn>
                        </template>
                    </v-col>
                </v-row>
            </form>
        </v-col>
        <v-col cols="12" v-if="get_product_disabled">
            <form @submit.prevent="setInfoProduct">
                <v-col cols="12 pl-0 pr-0 pt-1">
                    <select required v-model="productAdd.fiscal_found" @change="get_lot_fiscal_founds()" class="v-select-input">
                        <option value="null" disabled selected>Fuentes de financiamiento</option>
                        <option v-for="item in fiscal_found_list" :key="item.value" :value="item.value">
                            {{ item.text }}
                        </option>
                    </select>
                </v-col>
                <v-col cols="12 pl-0 pr-0 pt-1">
                    <select required v-model="productAdd.lot_fiscal_found" class="v-select-input">
                        <option value="null" disabled selected>Lote | Fecha de caducidad</option>
                        <option v-for="item in lot_list" :key="item.value" :value="item.value">
                            {{ item.text }}
                        </option>
                    </select>
                </v-col>
                <v-col cols="12 pl-0 pr-0 pt-1">
                    <v-text-field
                        v-model="productAdd.box"
                        hide-details
                        variant="outlined"
                        type="number"
                        :error-messages="errors"
                        label="Cantidad de cajas"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12 pl-0 pr-0 pt-1">
                    <v-text-field
                        v-model="productAdd.box_off"
                        hide-details
                        outlined
                        variant="outlined"
                        type="number"
                        :error-messages="errors"
                        label="Cantidad de piezas en caja"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12 pl-0 pr-0 pt-1">
                    <v-text-field
                        v-model="productAdd.quantity"
                        hide-details
                        outlined
                        variant="outlined"
                        type="number"
                        :error-messages="errors"
                        label="Cantidad fuera de caja"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12 pl-0 pr-0 pt-1">
                    <v-btn size="large" style="color: white; background-color: #13deb9" dark type="submit" block> Guardar </v-btn>
                </v-col>
            </form>
        </v-col>
    </v-row>
</template>

<style>
.ean-product input {
    padding: 80px 10px !important;
    line-height: 28px;
}

.v-select {
    position: relative;
}

.v-select-input {
    appearance: none;
    padding: 13px 16px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #ffffff;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.v-select-input:focus {
    outline: none;
    border-color: #767676;
    box-shadow: 0 0 0 1px rgb(118, 118, 118);
}
</style>
