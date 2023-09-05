import { createRouter, createWebHistory } from '@ionic/vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { UtilFront } from '@/utilities';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/pages/Error404.vue')
        },
        AuthRoutes, // Mantén las rutas de autenticación en primer lugar
        MainRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // Aquí debes implementar tu lógica para verificar si el usuario está autenticado

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = await UtilFront.getSession();

    if (requiresAuth && !isAuthenticated) {
        next('/auth/login');
    } else if (isAuthenticated && to.path === '/auth/login') {
        next({ name: 'MENU' });
    } else if (!requiresAuth && isAuthenticated) {
        next('/');
    } else if (to.path.startsWith('/auth/login') && to.fullPath !== '/auth/login') {
        next('/auth/login');
    } else {
        next();
    }
});

export default router;
