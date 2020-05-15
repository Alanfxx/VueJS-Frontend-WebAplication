<template>
    <div class="tap-ferramentas">
        <b-form v-show="novoButton.status">
            <input id="ferramenta-id" type="hidden" v-model="ferramenta.id">
            <b-row align-v="end">
                <b-col md='3' sm='12'>
                    <b-form-group label='Nome:' label-for='ferramenta-name' label-align="left">
                        <b-form-input id="ferramenta-name" type="text"
                        v-model="ferramenta.name" required
                        placeholder="Informe o nome.." />
                    </b-form-group>
                </b-col>
                <b-col md='3' sm='12'>
                    <b-form-group label='Quantidade:' label-for='ferramenta-quant' label-align="left">
                        <b-form-input id="ferramenta-quant" type="number"
                        v-model="ferramenta.quant" required
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
        <!-- =============== -->
        <div class="conteudo-ferramentas">
            <!-- Tabela dos itens -->
            <FerramentaTable>
                <FerramentaItemTable v-for="(item, i) in ferramentas" :key="i"
                    :ferramenta="item" :index="i" @clicou="ferramentaSelected(item)"/>
            </FerramentaTable>
            <!-- //Detalhe do item selecionado -->
            <ConteinerDetalhes :mostrarDetalhes="mostrarDetalhes">
                <ItemDetalhes :item='ferramenta' @editar="save" @remove="remove"/>
            </ConteinerDetalhes>
        </div>

    </div>
</template>

<script>
import FerramentaTable from './FerramentaTable'
import FerramentaItemTable from './FerramentaItemTable'
import ConteinerDetalhes from '../ConteinerDetalhes'
import ItemDetalhes from '../ItemDetalhes'


export default {
    name: 'TapFerramentas',
    components: { FerramentaTable, FerramentaItemTable, ConteinerDetalhes, ItemDetalhes },
    computed: {
        ferramentas() {
            return this.$store.getters.ferramentasList
        }
    },
    data: function() {
        return {
            novoButton: this.$store.state.global.novoButton,
            ferramenta: {},
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
                    this.ferramenta = {}
                    this.mostrarDetalhes.status = false
                }
            }
        }
    },
    methods: {
        ferramentaSelected(item) {
            this.novoButton.status = false
            this.mostrarDetalhes.status = true
            this.ferramenta = item
        },
        async reset() {
            await this.$store.dispatch('loadFerramentas')
            this.ferramenta = {}
            this.novoButton.status = false
            this.mostrarDetalhes.status = false
        },
        cancelar() {
            this.ferramenta = {}
            this.novoButton.status = false
        },
        async save () {
            await this.$store.dispatch('saveFerramenta', this.ferramenta)
            this.reset() 
        },
        async remove() {
            await this.$store.dispatch('removeFerramenta', this.ferramenta)
            this.reset()
        }
    },
    mounted() {
        this.ferramenta = {}
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
.conteudo-ferramentas {
    width: 100%;
    display: flex;
}
.tabela-ferramentas {
    width: 100%;
}
</style>