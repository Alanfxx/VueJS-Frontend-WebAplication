import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import global from './modules/global'
import pecas from './modules/pecas'
import ferramentas from './modules/ferramentas'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { user, global, pecas, ferramentas }
})
//this.$store.state.user.name

//this.$store.commit('toggleMenu', true) 
//ou import {mapMutations} from 'vuex'
//{ ...mapMutations(['toggleMenu']), }
// mutations: {
    // toggleMenu(state, isVisible) {
    //     if(!state.user) {
    //         state.isMenuVisible = false
    //         return
    //     }
    //     if(isVisible === undefined) {
    //         state.isMenuVisible = !state.isMenuVisible
    //     } else {
    //         state.isMenuVisible = isVisible
    //     }
    // }
// },

//this.$store.getters.names

//import { mapGetters } from 'vuex'
// getters: {
//     names(state) {
//         return state.user.map(u => u.name)
//     }
// },

//two-way-binding
//no componente
// computed: { 
//     quantidade: {
//         get() {
//             return this.$store.state.quantidade
//         },
//         set(valor) {
//             this.$store.commit('setQuantidade', valor)
//         }
//     }
// }