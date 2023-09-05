<script setup>
import { ref, onMounted, computed } from 'vue';
import ReceiptsService from '@/service/ReceiptsService';
import { useStore } from 'vuex';
import { Dialog } from '@capacitor/dialog';
import { Toast } from '@capacitor/toast';
import { Keyboard } from '@capacitor/keyboard';
import { v4 as uuidv4 } from 'uuid';
//import { UtilFront } from '@/utilities';

import { useToast } from 'vue-toastification';
const toast = useToast();
const getDimesion = ref(window.innerHeight);

const store = useStore();
const state = [
    {
        id: '90f17fc0-47bb-42f0-9576-8bbf2d9f6791',
        name: 'Ácido retinoico.',
        id_product: 'SKU-94',
        qr: '19777106',
        short_description: 'Ácido Retinoico Crema de 0.05mg/100 g. Envase con 20 g.',
        box_off: '21',
        health_sector_key: '010.000.0904.00',
        box: '2',
        quantity: '10',
        lot: '4694'
    },
    {
        id: '90f17fc0-47bb-42f0-9576-8bbf2d9f6791',
        name: 'Ácido retinoico.',
        id_product: 'SKU-94',
        qr: '19777106',
        short_description: 'Ácido Retinoico Crema de 0.05mg/100 g. Envase con 20 g.',
        box_off: '21',
        health_sector_key: '010.000.0904.00',
        box: '2',
        quantity: '10',
        lot: '4694'
    },
    {
        id: '90f17fc0-47bb-42f0-9576-8bbf2d9f6791',
        name: 'Ácido retinoico.',
        id_product: 'SKU-94',
        qr: '19777106',
        short_description: 'Ácido Retinoico Crema de 0.05mg/100 g. Envase con 20 g.',
        box_off: '21',
        health_sector_key: '010.000.0904.00',
        box: '2',
        quantity: '10',
        lot: '4694'
    },
    {
        id: '90f17fc0-47bb-42f0-9576-8bbf2d9f6791',
        name: 'Ácido retinoico.',
        id_product: 'SKU-94',
        qr: '19777106',
        short_description: 'Ácido Retinoico Crema de 0.05mg/100 g. Envase con 20 g.',
        box_off: '21',
        health_sector_key: '010.000.0904.00',
        box: '2',
        quantity: '10',
        lot: '4694'
    },
    {
        id: '90f17fc0-47bb-42f0-9576-8bbf2d9f6791',
        name: 'Ácido retinoico.',
        id_product: 'SKU-94',
        qr: '19777106',
        short_description: 'Ácido Retinoico Crema de 0.05mg/100 g. Envase con 20 g.',
        box_off: '21',
        health_sector_key: '010.000.0904.00',
        box: '2',
        quantity: '10',
        lot: '4694'
    },
    {
        id: '90f17fc0-47bb-42f0-9576-8bbf2d9f6791',
        name: 'Ácido retinoico.',
        id_product: 'SKU-94',
        qr: '19777106',
        short_description: 'Ácido Retinoico Crema de 0.05mg/100 g. Envase con 20 g.',
        box_off: '21',
        health_sector_key: '010.000.0904.00',
        box: '2',
        quantity: '10',
        lot: '4694'
    },
    
    {
        id: '6afda35a-fac5-48c9-b0a1-952bab319801',
        name: 'Prednisona.',
        id_product: 'SKU-95',
        qr: '7501125194207',
        short_description: 'Prednisona de 50 mg. Envase con 20 tabletas.',
        box_off: '2',
        health_sector_key: '010.000.0473.00',
        box: '12',
        quantity: '31',
        lot: '4661'
    },
    {
        id: '370d01b0-dec8-43ad-bdda-7a20c8dc30f1',
        name: 'Miconazol.',
        id_product: 'SKU-96',
        qr: '7501563308914',
        short_description: 'Miconazol Crema de 20 mg/1 g. Envase con 20 g.',
        box_off: '1',
        health_sector_key: '010.000.0891.00',
        box: '13',
        quantity: '31',
        lot: '4659'
    },
    {
        id: 'ab4eba01-1828-4107-bbb6-27d77149f913',
        name: 'Neomicina-Polimixina B-Fluocinolona-Lidocaína.',
        id_product: 'SKU-97',
        qr: '75035631',
        short_description:
            'Neomicina-Polimixina B-Fluocinolona-Lidocaína Solución Ótica con 0.350 g-1,000,000 UI-0.025 g-2 g/100 ml. Envase con gotero integral con 5 ml.',
        box_off: '11',
        health_sector_key: '010.000.3132.00',
        box: '1',
        quantity: '1',
        lot: '4659'
    },
    {
        id: '3e07bd80-f800-4a5d-8074-1079f35c407e',
        name: 'Ipratropio-salbutamol.',
        id_product: 'SKU-98',
        qr: '7506317700211',
        short_description: 'Ipratropio-Salbutamol Solución con 0.500 mg-2.500 mg/2.5 ml. Envase con 10 ampolletas de 2.5 ml.',
        box_off: '12',
        health_sector_key: '010.000.2188.00',
        box: '12',
        quantity: '3',
        lot: '4694'
    },
    {
        id: 'dc1f8379-063d-49e0-85a8-8dec18d5fe29',
        name: 'Amoxicilina-Ácido Clavulánico.',
        id_product: 'SKU-99',
        qr: '7502208892904',
        short_description: 'Amoxicilina-Ácido Clavulánico con 500 mg-125 mg. Envase con 12 tabletas.',
        box_off: '13',
        health_sector_key: '010.000.2230.00',
        box: '12',
        quantity: '14',
        lot: '4659'
    },
    {
        id: '583546a8-9b1f-4dd5-8da6-5ad63821748d',
        name: 'Lidocaína.',
        id_product: 'SKU-100',
        qr: '7502223111202',
        short_description: 'Lidocaína Solución al 10%, (10 g/100 ml). Envase con frasco/atomizador manual con 115 ml.',
        box_off: '123',
        health_sector_key: '010.000.0264.00',
        box: '123',
        quantity: '3',
        lot: '4659'
    }
];
const number = ref(0.12);

const inventory_hide = ref(false);

const inventory = ref({
    qr: ''
});

const clearForm = () => {
    inventory.value = {
        qr: ''
    };
    inventory_hide.value = false;
};

const hideKeyboard = () => {
    Keyboard.hide();
};

const getQuantity = (box, box_off, quantity) => {
    return parseInt(box) * parseInt(box_off) + parseInt(quantity);
};

const getNumber = computed(() => {
    if (state.length > 4) return window.innerHeight > 700 ? 0.4 : 0.65;
    else if (state.length > 3) return window.innerHeight > 700 ? 0.6 : 0.43;
    else if (state.length > 2) return window.innerHeight > 700 ? 0.6 : 0.33;
    else if (state.length > 1) return window.innerHeight > 700 ? 0.6 : 0.23;
    else return number.value;
});

const getInventory_ = (value) => {
    
    inventory_hide.value = true;
    console.log(value);
    hideKeyboard();
    toast.success('Inventario.' + inventory.value.qr);
};

onMounted(() => {
    window.addEventListener('keyup', (ev) => {
        if (ev.code === 'F16' || ev.code === 'F9') {
            const input = document.getElementById('barcode_botton');
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
        }
    });
});
</script>

<template>
    <v-row>
        <v-col cols="12" v-bind:class="[inventory_hide ? 'pb-0 pt-7' : 'pt-7']">        
            <form @submit.prevent="getInventory_">
                <v-text-field
                    dark
                    id="barcode_botton"
                    type="text"
                    :class="[inventory_hide ? '' : 'ean-product']"
                    autocomplete="off"
                    hide-details
                    append-inner-icon="mdi-qrcode-scan"
                    variant="outlined"
                    v-model="inventory.qr"
                    label="QR"
                >
                    <template v-if="inventory_hide" v-slot:append>
                        <v-btn style="color: white; background-color: #fa896b" dark @click="clearForm" class="mt-n2"> Regresar </v-btn>
                    </template>
                </v-text-field>
            </form>
        </v-col>
        <v-col cols="12" class="pt-3" v-if="inventory_hide">
            <v-card class="mx-auto menu_items_details" variant="outlined">
                <div class="card-header text-center">
                    <v-list-item title="Inventario">
                        <template v-slot:append>
                            <v-badge color="info" :content="state.length" inline></v-badge>
                        </template>
                    </v-list-item>
                </div>
                <div v-if="state.length == 0">
                    <v-divider class="border-opacity-100" color="info"></v-divider>
                    <div class="text-center pt-2 pb-2">
                        <h5>Sin productos</h5>
                    </div>
                </div>
                <div v-else>
                    <v-virtual-scroll :items="state" :height="getDimesion * getNumber + 'px'" item-height="60">
                        <template v-slot:default="{ item }">
                            <v-divider class="border-opacity-100" color="info"></v-divider>

                            <v-list-item class="pl-3">
                                <!--  <template v-slot:prepend>
                                    <v-avatar :color="'#5D87FF'" style="color: white" class="mr-3" size="28">
                                        <h6>{{ index + 1 }}</h6>
                                    </v-avatar>
                                </template> -->
                                <v-list-item-title class="pb-0"
                                    ><h4>{{ item.name }}</h4></v-list-item-title
                                >
                                <v-list-item-title class="pb-0">
                                    Cant. Total:
                                    <strong>{{ getQuantity(item.box, item.box_off, item.quantity) }}</strong>
                                    | Clave:
                                    <strong>{{ item.health_sector_key }}</strong>
                                </v-list-item-title>
                                <v-list-item-title>
                                    <i class="mdi mdi-qr mr-1"></i> EAN:
                                    <strong>{{ item.qr }}</strong>
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-virtual-scroll>
                </div>
            </v-card>
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
