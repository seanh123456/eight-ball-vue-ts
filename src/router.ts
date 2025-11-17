import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import EightBall from './views/EightBall.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Dashboard from './views/Dashboard.vue'
import Home from './views/Home.vue'
import Legal from './views/Legal.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', meta: { title: 'Hutch Home' }, component: Home },
    { path: '/eightball', meta: { title: 'Magic Eight Ball' }, component: EightBall },
    { path: '/about', meta: { title: 'About' }, component: About },
    { path: '/contact', meta: { title: 'Contact' }, component: Contact },
    { path: '/dashboard', meta: { title: 'Dashboard' }, component: Dashboard },
    { path: '/legal', meta: { title: 'Legal' }, component: Legal },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    console.log(to);
    document.title = to.meta.title as string;
});

export default router