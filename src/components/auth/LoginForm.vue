<script setup>
import { ref } from 'vue';
import UserService from '@/service/UserService';
import { UtilFront } from '@/utilities';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const router = useRouter();
const login = ref({
    username: '',
    password: ''
});
const toast = useToast();
const userService = new UserService();

const loginValidation = () => {
    userService
        .getUser()
        .then((data) => {
            
            let userLogin = data.find((u) => u.user == login.value.username && u.password == login.value.password);
            if (!userLogin) {
                toast.error('Usuario y/o contraseña son incorrectos.');
            } else {
                UtilFront.setSession(userLogin.id, userLogin);
                router.push('/');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
};
</script>

<template>
    <v-form @submit.prevent="loginValidation">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Usuario:</v-label>
                <v-text-field v-model="login.username" variant="outlined" hide-details color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Contraseña:</v-label>
                <v-text-field v-model="login.password" variant="outlined" type="password" hide-details color="primary"></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-btn type="submit" color="primary" size="large" block>INICIAR SESIÓN</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
