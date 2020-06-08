import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
  state: {
    aparelhos: [],
    aparelhosFiltrados: [],
    ctrlAparelho: {
      itemAtual: {},
      tab: 'todos',
      novo: false,
      busca: null,
      tipos: ['TV', 'Som', 'Celular', 'Camera', 'Notebook', 'Roteador'],
      editar: false,
      editarEstado: false
    }
  },
  mutations: {
    setAparelhos(state, aparelhos) {
      state.aparelhos = aparelhos
    },
    setAparelhosFiltrados(state, aparelhos) {
      state.aparelhosFiltrados = aparelhos
    }
  },
  actions: {
    // { dispatch, commit, state }
    //{array: '?', key: '?', order: 'cresc' || 'decr'}
    // aparelhosSortBy({ commit, state }, { tipo, key, order }) {
    //   let arrayNew = [...state.aparelhos]
    //   if (!order || order === 'cresc') {
    //     if (isNaN(arrayNew[Object.keys(arrayNew)[0]][key])) {
    //       arrayNew.sort((a, b) => a[key].toUpperCase() > b[key].toUpperCase() ? 1
    //         : b[key].toUpperCase() > a[key].toUpperCase() ? -1 : 0)
    //     } else {
    //       arrayNew.sort((a, b) => a[key] > b[key] ? 1
    //         : b[key] > a[key] ? -1 : 0)
    //     }
    //   } else {
    //     if (isNaN(arrayNew[Object.keys(arrayNew)[0]][key])) {
    //       arrayNew.sort((a, b) => a[key].toUpperCase() < b[key].toUpperCase() ? 1
    //         : b[key].toUpperCase() < a[key].toUpperCase() ? -1 : 0)
    //     } else {
    //       arrayNew.sort((a, b) => a[key] < b[key] ? 1
    //         : b[key] < a[key] ? -1 : 0)
    //     }
    //   }
    //   if (tipo === 'Todos') {
    //     commit('setAparelhosFiltrados', arrayNew)
    //   } else {
    //     let filtre = arrayNew.filter(item => item.name == tipo)
    //     commit('setAparelhosFiltrados', filtre)
    //   }
    // },
    async loadAparelhos({ commit, rootState }) {
      rootState.global.ctrlGlobal.processing = true
      return await axios.get(`${baseApiUrl}/aparelhos`).then(res => {
        commit('setAparelhos', res.data)
        commit('setAparelhosFiltrados', res.data)
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'sucesso', msg: 'Operação realizada com sucesso' }
      })
        .catch(err => {
          rootState.global.ctrlGlobal.processing = false
          return { tipo: 'erro', msg: err.response.data }
        })
    },
    async saveAparelho({ rootState }, aparelho) {
      rootState.global.ctrlGlobal.processing = true
      
      const method = aparelho.id ? 'put' : 'post'
      const id = aparelho.id ? `/${aparelho.id}` : ''
      return await axios[method](`${baseApiUrl}/aparelhos${id}`, aparelho).then(res => {
        // console.log(res.data)
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'sucesso', msg: 'Dados salvos', id: res.data }
      }).catch(err => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'erro', msg: err.response.data }
      })
    },
    async removeAparelho({ dispatch, rootState }, aparelho) {
      rootState.global.ctrlGlobal.processing = true

      const resp = await dispatch('delAparelhoFromList', aparelho)
      if(resp.tipo === 'erro') {
        rootState.global.ctrlGlobal.processing = false
        return resp
      } 

      const id = aparelho.id
      return await axios.delete(`${baseApiUrl}/aparelhos/${id}`).then(() => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'sucesso', msg: 'Dados excluídos' }
      }).catch(err => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'erro', msg: err.response.data }
      })
    }
  },
  getters: {
    aparelhosList(state) {
      return state.aparelhos
    },
    aparelhosFiltrados(state) {
      return state.aparelhosFiltrados
    },
    getAparelhoById: (state) => (id) => {
      return state.aparelhos.find(ap => ap.id === id)
    }
  }
}