// import axios from 'axios'
// import {baseApiUrl} from '@/global'

export default {
  state: {
      clientes: [
        {
          name: 'Nome Teste1',
          tel: ['7999512546'],
          aparelhos: [],
        },
        {
          name: 'Nome Teste2',
          tel: ['7999448888'],
          aparelhos: [],
        },
      ]
  },
  mutations: {
      setclientes(state, clientes) {
          state.clientes = clientes
      }
  },
  getters: {
      clientesList(state) {
          return state.clientes
      }
  } 
}