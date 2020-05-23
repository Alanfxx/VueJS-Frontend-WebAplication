import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    state: {
        ferramentas: [],
    },
    mutations: {
        setFerramentas(state, ferramentas) {
            state.ferramentas = ferramentas
        },
        //{key: '?', order: 'cresc' || 'decr'}
        ferramentasSortBy(state, {key, order}) {
            if(!order || order === 'cresc') {
                if(isNaN(state.ferramentas[Object.keys(state.ferramentas)[0]][key])) {
                    state.ferramentas.sort((a, b) => a[key].toUpperCase() > b[key].toUpperCase() ? 1 
                        : b[key].toUpperCase() > a[key].toUpperCase() ? -1 : 0)
                } else {
                    state.ferramentas.sort((a, b) => a[key] > b[key] ? 1 
                        : b[key] > a[key] ? -1 : 0)
                }
            } else {
                if(isNaN(state.ferramentas[Object.keys(state.ferramentas)[0]][key])) {
                    state.ferramentas.sort((a, b) => a[key].toUpperCase() < b[key].toUpperCase() ? 1 
                        : b[key].toUpperCase() < a[key].toUpperCase() ? -1 : 0)
                } else {
                    state.ferramentas.sort((a, b) => a[key] < b[key] ? 1 
                        : b[key] < a[key] ? -1 : 0)
                }
            }
        }
    },
    actions: {
        async loadFerramentas({commit, rootState}) {
            rootState.global.processing.status = true
            return await axios.get(`${baseApiUrl}/ferramentas`).then(res => {
                commit('setFerramentas', res.data)
                rootState.global.processing.status = false
                return {tipo: 'sucesso' , msg: 'Operação realizada com sucesso'}
            }).catch(err => {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async saveFerramenta({rootState}, ferramenta) {
            rootState.global.processing.status = true
            if(!ferramenta.name) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Nome não informado"}
            }
            if(!ferramenta.quant) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Quantidade não informada"}
            }
            ferramenta.quant = parseInt(ferramenta.quant)
            if(typeof ferramenta.quant !== "number") {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Quantidade inválida"}
            }
            if(ferramenta.quant < 0) {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: "Quantidade não pode ser negativa"}
            }

            const method = ferramenta.id ? 'put' : 'post'
            const id = ferramenta.id ? `/${ferramenta.id}` : ''
            return await axios[method](`${baseApiUrl}/ferramentas${id}`, ferramenta).then(() => {
                rootState.global.processing.status = false
                return {tipo: 'sucesso' , msg: 'Dados salvos'}
            }).catch( err => {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async removeFerramenta({rootState}, ferramenta) {
            rootState.global.processing.status = true
            const id = ferramenta.id
            return await axios.delete(`${baseApiUrl}/ferramentas/${id}`).then(() => {
                rootState.global.processing.status = false
                return {tipo: 'sucesso' , msg: 'Dados excluídos'}
            }).catch( err => {
                rootState.global.processing.status = false
                return {tipo: 'erro' , msg: err.response.data}
            })
        }
    },
    getters: {
        ferramentasList(state) {
            return state.ferramentas
        }
    } 
}