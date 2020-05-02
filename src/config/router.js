import Vue from 'vue'
import VueRouter from 'vue-router'

import InventarioPages from '@/components/content/inventario/InventarioPages'
import UsuarioPages from '@/components/content/clientes/ClientePages'
import Aparelhos from '@/components/content/aparelhos/AparelhoPages'
import Home from '@/components/content/Home'

Vue.use(VueRouter)

const routes = [{
    name: 'Home',
    path: '/',
    component: Home
}, {
    name: 'InventarioPages',
    path: '/inventario',
    component: InventarioPages
}, {
    name: 'UsuarioPages',
    path: '/clientes',
    component: UsuarioPages
}, {
    name: 'AparelhoPages',
    path: '/aparelhos',
    component: Aparelhos
}]

export default new VueRouter({
    mode: 'history',
    routes
})