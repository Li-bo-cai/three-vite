import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        name: '/',
        component: () => import('../views/one.vue')
    },
    {
        path: "/two",
        name: 'two',
        component: () => import('../views/two.vue')
    },
    {
        path: "/three",
        name: 'three',
        component: () => import('../views/three.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router