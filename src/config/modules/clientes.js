import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
  state: {
    clientes: [],
    clientesFiltrados: [],
    ctrlCliente: {
      tab: 'todos',
      itemAtual: {},
      novo: false,
      busca: null,
      editar: false
    }
  },
  mutations: {
    setClientes(state, clientes) {
      state.clientes = clientes
    },
    setClientesFiltrados(state, clientes) {
      state.clientesFiltrados = clientes
    }
  },
  actions: {
    // { dispatch, commit, state }
    //{array: '?', key: '?', order: 'cresc' || 'decr'}
    // clientesSortBy({ commit, state }, { tipo, key, order }) {
    //   let arrayNew = [...state.clientes]
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
    //     commit('setClientesFiltrados', arrayNew)
    //   } else {
    //     let filtre = arrayNew.filter(item => item.name == tipo)
    //     commit('setClientesFiltrados', filtre)
    //   }
    // },
    async loadClientes({ commit, rootState }) {
      rootState.global.ctrlGlobal.processing = true
      return await axios.get(`${baseApiUrl}/clientes`).then(res => {
        commit('setClientes', res.data)
        commit('setClientesFiltrados', res.data)
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'sucesso', msg: 'Operação realizada com sucesso' }
      })
        .catch(err => {
          rootState.global.ctrlGlobal.processing = false
          return { tipo: 'erro', msg: err.response.data }
        })
    },
    async saveCliente({ rootState }, cliente) {
      rootState.global.ctrlGlobal.processing = true
      const method = cliente.id ? 'put' : 'post'
      const id = cliente.id ? `/${cliente.id}` : ''
      return await axios[method](`${baseApiUrl}/clientes${id}`, cliente).then(() => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'sucesso', msg: 'Dados salvos' }
      }).catch(err => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'erro', msg: err.response.data }
      })
    },
    async removeCliente({ rootState }, cliente) {
      rootState.global.ctrlGlobal.processing = true
      // Não aceitar exclusão caso exista aparelho vinculado
      const aparelhos = rootState.aparelhos.aparelhos.filter(item => item.dono === cliente.id)
      if (aparelhos.length > 0) {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'erro', msg: 'Não é possível excluir. Cliente possui aparelhos vinculados' }
      }
      //----
      const id = cliente.id
      return await axios.delete(`${baseApiUrl}/clientes/${id}`).then(() => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'sucesso', msg: 'Dados excluídos' }
      }).catch(err => {
        rootState.global.ctrlGlobal.processing = false
        return { tipo: 'erro', msg: err.response.data }
      })
    },
    async delAparelhoFromList({ dispatch }, aparelho) {
      if (aparelho.dono) {
        let dono = this.getters.getClienteById(aparelho.dono)
        if (!dono) return { tipo: 'sucesso' }

        dono.aparelhos.splice(dono.aparelhos.indexOf(aparelho.id), 1);
        //Atualizar cliente
        return await dispatch('saveCliente', dono)
      }
      return { tipo: 'sucesso' }
    },
    async addAparelhoToList({ dispatch }, { apId, dono }) {
      if (!dono || !dono.aparelhos) return { tipo: 'sucesso' }
      dono.aparelhos.push(apId)
      return await dispatch('saveCliente', dono)
    }
  },
  getters: {
    clientesList(state) {
      return state.clientes
    },
    clientesFiltrados(state) {
      return state.clientesFiltrados
    },
    getClienteById: (state) => (id) => {
      return state.clientes.find(cli => cli.id === id)
    }
  }
}