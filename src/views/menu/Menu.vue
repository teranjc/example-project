<script setup>
/*Call Components*/
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="12 pb-0">
                    <router-link class="link-container" to="/receipts">
                        <div class="v-card-item pl-0 pr-0 pb-0">
                            <div class="v-card-item__content menu_items">
                                <div class="d-flex align-center">
                                    <div
                                        class="v-avatar v-theme v-avatar--density-default rounded-md v-avatar--variant-flat"
                                        style="width: 100px; height: 100px"
                                    >
                                        <img src="@/assets/images/wms/cajas.png" />
                                        <span class="v-avatar__underlay"></span>
                                    </div>
                                    <div class="pl-2">
                                        <h5 class="text-h5">Recibo</h5>
                                        <h6 class="text-subtitle-1 textSecondary mt-2">Creación y registro de comprobantes de recibos.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </v-col>
            <!--     <v-col cols="12 pb-0">
                    <router-link class="link-container" to="/inventory">
                        <div class="v-card-item pl-0 pr-0 pt-2 pb-0">
                            <div class="v-card-item__content menu_items">
                                <div class="d-flex align-center">
                                    <div
                                        class="v-avatar v-theme v-avatar--density-default rounded-md v-avatar--variant-flat"
                                        style="width: 100px; height: 100px"
                                    >
                                        <img src="@/assets/images/wms/estante.png" /><span class="v-avatar__underlay"></span>
                                    </div>
                                    <div class="pl-2">
                                        <h5 class="text-h5">Inventatario</h5>
                                        <h6 class="text-subtitle-1 textSecondary mt-2">Existencias de medicamentos en un almacén.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </v-col>
                <v-col cols="12 pb-0">
                    <div class="v-card-item pl-0 pr-0 pt-2">
                        <div class="v-card-item__content menu_items">
                            <div class="d-flex align-center">
                                <div
                                    class="v-avatar v-theme v-avatar--density-default rounded-md v-avatar--variant-flat"
                                    style="width: 100px; height: 100px"
                                >
                                    <img src="@/assets/images/wms/ajuste.png" /><span class="v-avatar__underlay"></span>
                                </div>
                                <div class="pl-2">
                                    <h5 class="text-h5">Salida</h5>
                                    <h6 class="text-subtitle-1 textSecondary mt-2">Retiro y distribución de un producto del inventario.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col> -->
            </v-row>
        </v-col>
    </v-row>
</template>

<style scoped>
.link-container {
    text-decoration: none; /* Quita el subrayado del enlace */
    color: inherit; /* Hereda el color del texto del padre */
    outline: none; /* Quita el contorno cuando el enlace está enfocado */
}
</style>
