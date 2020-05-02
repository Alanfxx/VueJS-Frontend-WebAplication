import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            name: 'Usuário Adm',
            email: 'mock@gmail.com'
        }
    },
    //this.$store.state.user.name

    //this.$store.commit('toggleMenu', true) 
    //ou import {mapMutations} from 'vuex'
    //{ ...mapMutations(['toggleMenu']), }
    // mutations: {
    //     toggleMenu(state, isVisible) {
    //         if(isVisible === undefined) {
    //             state.isMenuVisible = !state.isMenuVisible
    //         } else {
    //             state.isMenuVisible = isVisible
    //         }
    //     }
    // },

    //this.$store.getters.names

    //import { mapGetters } from 'vuex'
    // getters: {
    //     names(state) {
    //         return state.user.map(u => u.name)
    //     }
    // },

    //this.$store.dispatch('adicionarProduto', produto)
    //import { mapActions } from 'vuex'
    //...mapActions(['adcionarProduto'])
    // actions: {
    //     adicionarProduto({ commit }, payload) {
    //         setTimeout(() => {
    //             commit('adicionarProduto', payload)
    //         }, 1000)
    //     }
    // }

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
})