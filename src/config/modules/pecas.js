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
            await axios.get(`${baseApiUrl}/pecas`).then(res => commit('setPecas', res.data))
                .catch(err => console.log(err)) //melhorar isso
        },
        async savePeca(context, peca) {
            peca.quant = parseInt(peca.quant)

            const method = peca.id ? 'put' : 'post'
            const id = peca.id ? `/${peca.id}` : ''
            await axios[method](`${baseApiUrl}/pecas${id}`, peca).then(() => {
                    //toasted
                }).catch( e => {
                    console.log(e.response.data) // melhorar isso
                })
        },
        async removePeca(context, peca) {
            const id = peca.id
            await axios.delete(`${baseApiUrl}/pecas/${id}`).then(() => {
                    //toasted
                }).catch(
                    //toasted
                )
        }
    },
    getters: {
        pecasList(state) {
            return state.pecas
        }
    } 
}