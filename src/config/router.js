import Vue from 'vue'
import VueRouter from 'vue-router'

import InventarioPages from '@/components/content/inventarioPages/InventarioPages'
import UsuarioPages from '@/components/content/usuarioPages/UsuarioPages'

Vue.use(VueRouter)

const routes = [{
    name: 'InventarioPages',
    path: '/inventario',
    component: InventarioPages
}, {
    name: 'UsuarioPages',
    path: '/Usuarios',
    component: UsuarioPages
}]

export default new VueRouter({
    mode: 'history',
    routes
})