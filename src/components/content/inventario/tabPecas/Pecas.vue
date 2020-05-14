<template>
    <div class="tap-pecas">
        <b-form v-show="novoButton.status">
            <input id="peca-id" type="hidden" v-model="peca.id">
            <b-row align-v="end">
                <b-col md='3' sm='12'>
                    <b-form-group label='Nome:' label-for='peca-name' label-align="left">
                        <b-form-input id="peca-name" type="text"
                        v-model="peca.name" required
                        placeholder="Informe o Nome da Peça.." />
                    </b-form-group>
                </b-col>
                <b-col md='3' sm='12'>
                    <b-form-group label='Referencia:' label-for='peca-ref' label-align="left">
                        <b-form-input id="peca-ref" type="text"
                        v-model="peca.ref" required
                        placeholder="Informe a Referência da Peça.." />
                    </b-form-group>
                </b-col>
                <b-col md='3' sm='12'>
                    <b-form-group label='Quantidade:' label-for='peca-quant' label-align="left">
                        <b-form-input id="peca-quant" type="number"
                        v-model="peca.quant" required
                        placeholder="Informe a Quantidade da Peça.." />
                    </b-form-group>
                </b-col>
                
                <b-col md='3' sm='12' >
                    <b-form-group align-v="end">
                        <b-button variant="success" @click="save">Salvar</b-button>
                        <b-button variant="danger" @click="cancelar" class="ml-2">Cancelar</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <!-- =============== -->
        <div class="conteudo-pecas">
            <div class="tabela-pecas">
                <div class="header-tabela">
                    <span><strong>Nome</strong></span><span><strong>Quantidade</strong></span>
                </div>
                <div class="pecas-group" v-for="(item, i) in pecas" :key="i">
                    <PecaItemTable :peca="item" :index="i" @clicou="pecaSelected(item)"/>
                </div>
            </div>
            <!-- //detalhe aqui -->
            <ConteinerDetalhes :mostrarDetalhes="mostrarDetalhes">
                <ItemDetalhes :item='peca' @editar="save" @remove="remove"/>
            </ConteinerDetalhes>
        </div>

    </div>
</template>

<script>
import PecaItemTable from './PecaItemTable'
import ConteinerDetalhes from '../ConteinerDetalhes'
import ItemDetalhes from '../ItemDetalhes'


export default {
    name: 'TapPecas',
    components: { PecaItemTable, ConteinerDetalhes, ItemDetalhes },
    computed: {
        pecas() {
            return this.$store.getters.pecasList
        }
    },
    data: function() {
        return {
            novoButton: this.$store.state.global.novoButton,
            peca: {},
            fields: [
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'ref', label: 'Referência', sortable: false},
                {key: 'quant', label: 'Quantidade', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            mostrarDetalhes: {
                status: false
            }
        }
    },
    watch: {
        novoButton: {
            deep: true,
            handler: function() {
                if(this.novoButton.status) {
                    this.peca = {}
                    this.mostrarDetalhes.status = false
                }
            }
        }
    },
    methods: {
        pecaSelected(item) {
            this.novoButton.status = false
            this.mostrarDetalhes.status = true
            this.peca = item
        },
        async reset() {
            await this.$store.dispatch('loadPecas')
            this.peca = {}
            this.novoButton.status = false
            this.mostrarDetalhes.status = false
        },
        cancelar() {
            this.peca = {}
            this.novoButton.status = false
        },
        async save () {
            await this.$store.dispatch('savePeca', this.peca)
            this.reset() 
        },
        async remove() {
            await this.$store.dispatch('removePeca', this.peca)
            this.reset()
        }
    },
    mounted() {
        this.peca = {}
        this.novoButton.status = false
        this.mostrarDetalhes.status = false
    }
}
</script>

<style>
.header-tabela {
    height: 45px;
    display: flex;
    align-items: center;
    user-select: none;
    /* background-color: #fafafa; */
    border-bottom: 2px solid #dedede;
    border-top: 1px solid #eee;
}
.header-tabela span {
    width: 100%;
}
.conteudo-pecas {
    width: 100%;
    display: flex;
}
.tabela-pecas {
    width: 100%;
}
</style>