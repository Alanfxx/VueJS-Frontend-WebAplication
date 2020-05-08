import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        isMenuVisible: false
    },
    //this.$store.state.user.name

    //this.$store.commit('toggleMenu', true) 
    //ou import {mapMutations} from 'vuex'
    //{ ...mapMutations(['toggleMenu']), }
    mutations: {
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            }else{
                state.isMenuVisible = false
            }
        },
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
    },

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