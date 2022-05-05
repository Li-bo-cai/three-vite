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
    },
    {
        path: "/four",
        name: 'four',
        component: () => import('../views/four.vue')
    },
    {
        path: "/five",
        name: 'five',
        component: () => import('../views/five.vue')
    },
    {
        path: "/six",
        name: 'six',
        component: () => import('../views/six.vue')
    },
    {
        path: "/seven",
        name: 'seven',
        component: () => import('../views/seven.vue')
    },
    {
        path: "/eight",
        name: 'eight',
        component: () => import('../views/eight.vue')
    },
    {
        path: "/nine",
        name: 'nine',
        component: () => import('../views/nine.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router