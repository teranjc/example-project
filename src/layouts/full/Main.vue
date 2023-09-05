<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import Logo from './logo/Logo.vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { UtilFront } from '@/utilities';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const url = ref(['/receipts']);
const menu = ref(false);

const logout = async () => {
    await UtilFront.clearSession();
    router.push('/');
    store.commit('auth/SESSION_UPDATE', false);
};

// Icon Imports
// dropdown imports
const changeRoute = (to: any) => {
    menu.value = url.value.some((path) => to.path.startsWith(path));
};

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

watch(router, (to, from) => {
    changeRoute(to);
});

onBeforeRouteUpdate(async (to, from) => {
    changeRoute(to);
});
</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
        <div class="pa-5">
            <Logo />
        </div>

        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-6">
                    <template v-for="(item, i) in sidebarMenu">
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />

                        <NavItem :item="item" v-else class="leftPadding" />
                    </template>
                </v-list>
            </perfect-scrollbar>
        </div>
    </v-navigation-drawer>
    
    <!------Header-------->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100 topSidebar">
            <div>
                <v-btn
                    class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
                    @click="sDrawer = !sDrawer"
                    icon
                    variant="flat"
                    size="small"
                >
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->
            </div>
            <div>
                <!-- User Profile -->
                <div class="pt-4 pb-4 px-5 text-center">
                    <v-btn v-if="!menu" @click="logout" color="primary" variant="outlined" block>Cerrar sesión</v-btn>
                    <!-- <v-btn :to="'/'" v-if="menu" color="primary" variant="flat" block>Menu</v-btn> -->
                    <br v-if="menu">
                </div>
                <!-- <ProfileDD /> -->
            </div>
        </div>
    </v-app-bar>
</template>
