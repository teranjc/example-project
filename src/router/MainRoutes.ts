const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            path: '/',
            component: () => import('@/views/menu/Menu.vue')
        },
        {
            path: '/inventory',
            component: () => import('@/views/pages/inventory/Inventory.vue')
        },
        {
            path: '/receipts',
            component: () => import('@/views/pages/receipts/ReceiptsPage.vue')
            /*   children: [
                {
                    path: 'tab1',
                    component: () => import('@/views/pages/receipts/ReceiptsForm.vue')
                },
                {
                    path: 'tab2',
                    component: () => import('@/views/pages/receipts/ReceiptsListProducts.vue')
                }
            ] */
        }
    ]
};

export default MainRoutes;
