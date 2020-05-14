import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    state: {
        ferramentas: [],
    },
    mutations: {
        setFerramentas(state, ferramentas) {
            state.ferramentas = ferramentas
        }
    },
    actions: {
        async loadFerramentas({commit}) {
            await axios.get(`${baseApiUrl}/ferramentas`).then(res => commit('setFerramentas', res.data))
                .catch(err => console.log(err)) //melhorar isso
        },
        async saveFerramenta(context, ferramenta) {
            ferramenta.quant = parseInt(ferramenta.quant)

            const method = ferramenta.id ? 'put' : 'post'
            const id = ferramenta.id ? `/${ferramenta.id}` : ''
            await axios[method](`${baseApiUrl}/ferramentas${id}`, ferramenta).then(() => {
                    //toasted
                }).catch( e => {
                    console.log(e.response.data) // melhorar isso
                })
        },
        async removeFerramenta(context, ferramenta) {
            const id = ferramenta.id
            await axios.delete(`${baseApiUrl}/ferramentas/${id}`).then(() => {
                    //toasted
                }).catch(
                    //toasted
                )
        }
    },
    getters: {
        ferramentasList(state) {
            return state.ferramentas
        }
    } 
}