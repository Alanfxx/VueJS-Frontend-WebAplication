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
        async loadFerramentas({commit}) {
            return await axios.get(`${baseApiUrl}/ferramentas`).then(res => {
                commit('setFerramentas', res.data)
                return {tipo: 'sucesso' , msg: 'Operação realizada com sucesso'}
            }).catch(err => {
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async saveFerramenta(context, ferramenta) {
            ferramenta.quant = parseInt(ferramenta.quant)

            const method = ferramenta.id ? 'put' : 'post'
            const id = ferramenta.id ? `/${ferramenta.id}` : ''
            return await axios[method](`${baseApiUrl}/ferramentas${id}`, ferramenta).then(() => {
                return {tipo: 'sucesso' , msg: 'Dados salvos com sucesso'}
            }).catch( err => {
                return {tipo: 'erro' , msg: err.response.data}
            })
        },
        async removeFerramenta(context, ferramenta) {
            const id = ferramenta.id
            return await axios.delete(`${baseApiUrl}/ferramentas/${id}`).then(() => {
                return {tipo: 'sucesso' , msg: 'Excluído com sucesso'}
            }).catch( err => {
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