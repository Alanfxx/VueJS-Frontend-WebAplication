import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    state: {
        ferramentas: [],
        ferramentasFiltradas: []
    },
    mutations: {
        setFerramentas(state, ferramentas) {
            state.ferramentas = ferramentas
        },
        setFerramentasFiltradas(state, ferramentas) {
            state.ferramentasFiltradas = ferramentas
        }
    },
    actions: {
        // { dispatch, commit, state }
        //{array: '?', key: '?', order: 'cresc' || 'decr'}
        ferramentasSortBy({commit, state}, {tipo, key, order}) {
            let arrayNew = [ ...state.ferramentas ]
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
                commit('setFerramentasFiltradas', arrayNew)
            } else {
                let filtre = arrayNew.filter(item => item.name == tipo)
                commit('setFerramentasFiltradas', filtre)
            }
        },
        async loadFerramentas({commit, rootState}) {
            rootState.global.ctrlGlobal.processing = true
            return await axios.get(`${baseApiUrl}/ferramentas`).then(res => {
                commit('setFerramentas', res.data)
                commit('setFerramentasFiltradas', res.data)
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'sucesso' , msg: 'Operação realizada com sucesso'}
            }).catch(err => {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async saveFerramenta({rootState}, ferramenta) {
            rootState.global.ctrlGlobal.processing = true
            if(!ferramenta.name) {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: "Nome não informado"}
            }
            if(!ferramenta.quant) {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: "Quantidade não informada"}
            }
            ferramenta.quant = parseInt(ferramenta.quant)
            if(typeof ferramenta.quant !== "number") {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: "Quantidade inválida"}
            }
            if(ferramenta.quant < 0) {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: "Quantidade não pode ser negativa"}
            }

            const method = ferramenta.id ? 'put' : 'post'
            const id = ferramenta.id ? `/${ferramenta.id}` : ''
            return await axios[method](`${baseApiUrl}/ferramentas${id}`, ferramenta).then(() => {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'sucesso' , msg: 'Dados salvos'}
            }).catch( err => {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async removeFerramenta({rootState}, ferramenta) {
            rootState.global.ctrlGlobal.processing = true
            const id = ferramenta.id
            return await axios.delete(`${baseApiUrl}/ferramentas/${id}`).then(() => {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'sucesso' , msg: 'Dados excluídos'}
            }).catch( err => {
                rootState.global.ctrlGlobal.processing = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        }
    },
    getters: {
        ferramentasList(state) {
            return state.ferramentas
        },
        ferramentasFiltradas(state) {
            return state.ferramentasFiltradas
        }
    } 
}