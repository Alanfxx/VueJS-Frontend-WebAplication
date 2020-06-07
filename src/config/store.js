import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import global from './modules/global'
import pecas from './modules/pecas'
import ferramentas from './modules/ferramentas'
import aparelhos from './modules/aparelhos'
import clientes from './modules/clientes'
import inventario from './modules/inventario'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        global,
        pecas,
        ferramentas,
        aparelhos,
        clientes,
        inventario
    }
})