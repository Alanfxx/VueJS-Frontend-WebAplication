import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    state: {
        pecas: [],
        pecasFiltradas: []
    },
    mutations: {
        setPecas(state, pecas) {
            state.pecas = pecas
        },
        setPecasFiltradas(state, pecas) {
            state.pecasFiltradas = pecas
        }
    },
    actions: {
        // { dispatch, commit, state }
        //{array: '?', key: '?', order: 'cresc' || 'decr'}
        arraySortBy({commit, state}, {tipo, key, order}) {
            let arrayNew = [ ...state.pecas ]
            if(!order || order === 'cresc') {
                if(isNaN(arrayNew[Object.keys(arrayNew)[0]][key])) {
                    arrayNew.sort((a, b) => a[key].toUpperCase() > b[key].toUpperCase() ? 1 
                        : b[key].toUpperCase() > a[key].toUpperCase() ? -1 : 0)
                } else {
                    arrayNew.sort((a, b) => a[key] > b[key] ? 1 
                        : b[key] > a[key] ? -1 : 0)
                }
            } else {
                if(isNaN(arrayNew[Object.keys(arrayNew)[0]][key])) {
                    arrayNew.sort((a, b) => a[key].toUpperCase() < b[key].toUpperCase() ? 1 
                        : b[key].toUpperCase() < a[key].toUpperCase() ? -1 : 0)
                } else {
                    arrayNew.sort((a, b) => a[key] < b[key] ? 1 
                        : b[key] < a[key] ? -1 : 0)
                }
            }
            if(tipo === 'Todos') {
                commit('setPecasFiltradas', arrayNew)
            } else {
                let filtre = arrayNew.filter(item => item.name == tipo)
                commit('setPecasFiltradas', filtre)
            }
        },
        async loadPecas({commit, rootState}) {
            rootState.global.processing.status = true
            return await axios.get(`${baseApiUrl}/pecas`).then(res => {
                commit('setPecas', res.data)
                commit('setPecasFiltradas', res.data)
                rootState.global.processing.status = false
                return {tipo: 'sucesso' , msg: 'Operação realizada com sucesso'}
            })
            .catch(err => {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async savePeca({rootState}, peca) {
            rootState.global.processing.status = true

            if(!peca.name) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Nome não informado"}
            }
            if(!peca.ref) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Referência não informada"}
            }
            if(!peca.quant) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Quantidade não informada"}
            }
            peca.quant = parseInt(peca.quant)
            if(typeof peca.quant !== "number") {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Quantidade inválida"}
            }
            if(peca.quant < 0) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Quantidade não pode ser negativa"}
            }

            const method = peca.id ? 'put' : 'post'
            const id = peca.id ? `/${peca.id}` : ''
            return await axios[method](`${baseApiUrl}/pecas${id}`, peca).then(() => {
                    rootState.global.processing.status = false
                    return {tipo: 'sucesso' , msg: 'Dados salvos'}
                }).catch( err => {
                    rootState.global.processing.status = false
                    return {tipo: 'erro' , msg: err.response.data}
                })
        },
        async removePeca({rootState}, peca) {
            rootState.global.processing.status = true
            const id = peca.id
            return await axios.delete(`${baseApiUrl}/pecas/${id}`).then(() => {
                    rootState.global.processing.status = false
                    return {tipo: 'sucesso' , msg: 'Dados excluídos'}
                }).catch( err => {
                    rootState.global.processing.status = false
                    return {tipo: 'erro' , msg: err.response.data}
                })
        }
    },
    getters: {
        pecasList(state) {
            return state.pecas
        },
        pecasFiltradas(state) {
            return state.pecasFiltradas
        }
    } 
}