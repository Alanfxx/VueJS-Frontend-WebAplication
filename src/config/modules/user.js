import axios from 'axios'

export default {
    state: {
        user: null
    },
   
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
   
    actions: {
        adicionarUser({ commit, rootState }, user) {
            commit('setUser', user)
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                rootState.global.ctrlGlobal.isMenuVisible = true
            }else{
                rootState.global.ctrlGlobal.isMenuVisible = false
            }
        }
    }, 

    getters: {
        userNames(state) {
            return state.user.map(u => u.name)
        }
    }
}