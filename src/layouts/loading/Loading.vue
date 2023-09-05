<template>
    <section class="loading-container">
        <ion-item>
            <ion-spinner name="lines"></ion-spinner>
        </ion-item>
    </section>
    <section class="loading-container-p">
        <h3>Cargando</h3>
    </section>
</template>
<script lang="ts">
import { IonItem, IonLabel, IonSpinner } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonItem, IonLabel, IonSpinner }
});
</script>

<style scoped lang="scss">
/* common */
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.26); /* Fondo oscuro transparente */
    z-index: 9999; /* Capa superior */
}

.loading-container-p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 111vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999; /* Capa superior */
}

ion-spinner {
    width: 35px;
    height: 35px;
}

.loading {
    font-size: 84px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    text-align: center;
    span {
        display: inline-block;
        margin: 0 -0.05em;
    }
}

/* code #6 */
.loading06 {
    span {
        position: relative;
        color: rgba(#000, 0.2);
        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: attr(data-text);
            color: #fff;
            opacity: 0;
            transform: rotateY(-90deg);
            animation: loading06 4s infinite;
        }
        @for $i from 1 through 6 {
            &:nth-child(#{$i + 1})::after {
                animation-delay: #{$i * 0.2}s;
            }
        }
    }
}

@keyframes loading06 {
    0%,
    75%,
    100% {
        transform: rotateY(-90deg);
        opacity: 0;
    }
    25%,
    50% {
        transform: rotateY(0);
        opacity: 1;
    }
}
</style>
