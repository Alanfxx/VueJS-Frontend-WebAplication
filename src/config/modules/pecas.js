import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    state: {
        pecas: [],
    },
    mutations: {
        setPecas(state, pecas) {
            state.pecas = pecas
        },

        //{key: '?', order: 'cresc' || 'decr'}
        pecasSortBy(state, {key, order}) {
            if(!order || order === 'cresc') {
                if(isNaN(state.pecas[Object.keys(state.pecas)[0]][key])) {
                    state.pecas.sort((a, b) => a[key].toUpperCase() > b[key].toUpperCase() ? 1 
                        : b[key].toUpperCase() > a[key].toUpperCase() ? -1 : 0)
                } else {
                    state.pecas.sort((a, b) => a[key] > b[key] ? 1 
                        : b[key] > a[key] ? -1 : 0)
                }
            } else {
                if(isNaN(state.pecas[Object.keys(state.pecas)[0]][key])) {
                    state.pecas.sort((a, b) => a[key].toUpperCase() < b[key].toUpperCase() ? 1 
                        : b[key].toUpperCase() < a[key].toUpperCase() ? -1 : 0)
                } else {
                    state.pecas.sort((a, b) => a[key] < b[key] ? 1 
                        : b[key] < a[key] ? -1 : 0)
                }
            }
        }
    },
    actions: {
        async loadPecas({commit}) {
            return await axios.get(`${baseApiUrl}/pecas`).then(res => {
                commit('setPecas', res.data)
                return {tipo: 'sucesso' , msg: 'Operação realizada com sucesso'}
            })
            .catch(err => {
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async savePeca(context, peca) {
            peca.quant = parseInt(peca.quant)

            const method = peca.id ? 'put' : 'post'
            const id = peca.id ? `/${peca.id}` : ''
            return await axios[method](`${baseApiUrl}/pecas${id}`, peca).then(() => {
                    return {tipo: 'sucesso' , msg: 'Dados salvos com sucesso'}
                }).catch( err => {
                    return {tipo: 'erro' , msg: err.response.data}
                })
        },
        async removePeca(context, peca) {
            const id = peca.id
            return await axios.delete(`${baseApiUrl}/pecas/${id}`).then(() => {
                    return {tipo: 'sucesso' , msg: 'Excluído com sucesso'}
                }).catch( err => {
                    return {tipo: 'erro' , msg: err.response.data}
                })
        }
    },
    getters: {
        pecasList(state) {
            return state.pecas
        }
    } 
}