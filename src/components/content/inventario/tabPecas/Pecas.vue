<template>
    <div class="tab-pecas">
        <!-- Formulario de inserção de novo item (bootstrap) -->
        <b-form v-show="novoButton.status">
            <input id="peca-id" type="hidden" v-model="peca.id">
            <b-row align-v="end">
                <b-col md='3' sm='12'>
                    <b-form-group label='Nome:' label-for='peca-name' label-align="left">
                        <b-form-input id="peca-name" type="text"
                        v-model="peca.name" required
                        placeholder="Informe o nome.." />
                    </b-form-group>
                </b-col>
                <b-col md='3' sm='12'>
                    <b-form-group label='Referencia:' label-for='peca-ref' label-align="left">
                        <b-form-input id="peca-ref" type="text"
                        v-model="peca.ref" required
                        placeholder="Informe a referência.." />
                    </b-form-group>
                </b-col>
                <b-col md='3' sm='12'>
                    <b-form-group label='Quantidade:' label-for='peca-quant' label-align="left">
                        <b-form-input id="peca-quant" type="number"
                        v-model="peca.quant" required
                        placeholder="Informe a quantidade.." />
                    </b-form-group>
                </b-col>
                
                <b-col md='3' sm='12' >
                    <b-form-group align-v="end">
                        <b-button variant="success" @click="save">Salvar</b-button>
                        <b-button @click="cancelar" class="ml-2">Cancelar</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <div class="conteudo-pecas">
            <!-- Tabela dos itens -->
            <PecaTable>
                <PecaItemTable v-for="(item, i) in pecas" :key="i"
                    :peca="item" :index="i" @clicou="pecaSelected(item)"/>
            </PecaTable>
            <!-- //Detalhe do item selecionado -->
            <ConteinerDetalhes :mostrarDetalhes="mostrarDetalhes">
                <ItemDetalhes :item='peca' @editar="save" @remove="remove"/>
            </ConteinerDetalhes>
        </div>

    </div>
</template>

<script>
import PecaTable from './PecaTable'
import PecaItemTable from './PecaItemTable'
import ConteinerDetalhes from '../ConteinerDetalhes'
import ItemDetalhes from '../ItemDetalhes'


export default {
    name: 'TabPecas',
    components: { PecaTable, PecaItemTable, ConteinerDetalhes, ItemDetalhes },
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
.conteudo-pecas {
    width: 100%;
    display: flex;
}
</style>