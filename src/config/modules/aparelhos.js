// import axios from 'axios'
// import {baseApiUrl} from '@/global'

export default {
    state: {
        aparelhos: [
          {
            tipo: 'TV',
            marca: 'Samsung',
            modelo: 'sa2344',
            estado: 'Pendente',
            dataEntrada: '25/05/2020',
            dataSaida: '',
            descricao: 'Adipiscing rutrum nisl litora erat nullam etiam facilisis, nullam torquent blandit quis fusce metus, nibh integer inceptos eros sodales dapibus. proin ac phasellus in etiam sodales ullamcorper posuere erat netus laoreet, donec quam enim pulvinar porttitor donec eget ultrices quam sociosqu sem, class sit viverra ac orci taciti in conubia mi.'
          },
          {
            tipo: 'Som',
            marca: 'Sony',
            modelo: 'n29874',
            estado: 'Pendente',
            dataEntrada: '22/05/2020',
            dataSaida: '',
            descricao: 'Adipiscing rutrum nisl litora erat nullam etiam facilisis, nullam torquent blandit quis fusce metus, nibh integer inceptos eros sodales dapibus. proin ac phasellus in etiam sodales ullamcorper posuere erat netus laoreet, donec quam enim pulvinar porttitor donec eget ultrices quam sociosqu sem, class sit viverra ac orci taciti in conubia mi.'
          },
          {
            tipo: 'Celular',
            marca: 'Motorola',
            modelo: 'moto3234',
            estado: 'Pendente',
            dataEntrada: '20/05/2020',
            dataSaida: '',
            descricao: 'Adipiscing rutrum nisl litora erat nullam etiam facilisis, nullam torquent blandit quis fusce metus, nibh integer inceptos eros sodales dapibus. proin ac phasellus in etiam sodales ullamcorper posuere erat netus laoreet, donec quam enim pulvinar porttitor donec eget ultrices quam sociosqu sem, class sit viverra ac orci taciti in conubia mi.'
          },
          {
            tipo: 'Camera',
            marca: 'Teste',
            modelo: 'er4545',
            estado: 'Pendente',
            dataEntrada: '02/05/2020',
            dataSaida: '',
            descricao: 'Adipiscing rutrum nisl litora erat nullam etiam facilisis, nullam torquent blandit quis fusce metus, nibh integer inceptos eros sodales dapibus. proin ac phasellus in etiam sodales ullamcorper posuere erat netus laoreet, donec quam enim pulvinar porttitor donec eget ultrices quam sociosqu sem, class sit viverra ac orci taciti in conubia mi.'
          },
          {
            tipo: 'Notebook',
            marca: 'Teste2',
            modelo: 'er45452',
            estado: 'Pendente',
            dataEntrada: '02/05/2020',
            dataSaida: '',
            descricao: 'Adipiscing rutrum nisl litora erat nullam etiam facilisis, nullam torquent blandit quis fusce metus, nibh integer inceptos eros sodales dapibus. proin ac phasellus in etiam sodales ullamcorper posuere erat netus laoreet, donec quam enim pulvinar porttitor donec eget ultrices quam sociosqu sem, class sit viverra ac orci taciti in conubia mi.'
          },
          {
            tipo: 'Roteador',
            marca: 'Teste3',
            modelo: 'r547984',
            estado: 'Pendente',
            dataEntrada: '02/05/2020',
            dataSaida: '',
            descricao: 'Adipiscing rutrum nisl litora erat nullam etiam facilisis, nullam torquent blandit quis fusce metus, nibh integer inceptos eros sodales dapibus. proin ac phasellus in etiam sodales ullamcorper posuere erat netus laoreet, donec quam enim pulvinar porttitor donec eget ultrices quam sociosqu sem, class sit viverra ac orci taciti in conubia mi.'
          }
        ]
    },
    mutations: {
        setaparelhos(state, aparelhos) {
            state.aparelhos = aparelhos
        }
    },
    getters: {
        aparelhosList(state) {
            return state.aparelhos
        }
    } 
}