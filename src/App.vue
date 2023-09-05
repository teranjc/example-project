<template>
    <RouterView></RouterView>
    <Loading v-if="utilFront.isLoading()"></Loading>
</template>

<script setup lang="ts">
import { UtilFront } from '@/utilities';
import { RouterView } from 'vue-router';

const utilFront = UtilFront;
</script>
