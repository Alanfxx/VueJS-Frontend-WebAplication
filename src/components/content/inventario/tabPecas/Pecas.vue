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
                        <b-button variant="success" @click="save(peca)">Salvar</b-button>
                        <b-button @click="cancelar" class="ml-2">Cancelar</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <div class="conteudo-pecas">
            <!-- Tabela dos itens -->
            <PecaTable>
                <PecaItemTable v-for="(item, i) in pecas" :key="i" :peca="item" :index="i"
                    @editar='save(item)' @remove='remove(item)'/>
            </PecaTable>
        </div>
    </div>
</template>

<script>
import PecaTable from './PecaTable'
import PecaItemTable from './PecaItemTable'


export default {
    name: 'TabPecas',
    components: { PecaTable, PecaItemTable },
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
            ]
        }
    },
    watch: {
        novoButton: {
            deep: true,
            handler: function() {
                if(this.novoButton.status) {
                    this.peca = {}
                }
            }
        }
    },
    methods: {
        pecaToast(msg, variant) {
            this.$bvToast.toast(msg || 'Sem mensagem', {
                title: 'Autenticação',
                variant: variant,
                solid: true
            })
        },
        async reset() {
            const res = await this.$store.dispatch('loadPecas')
            if(res.tipo === 'erro') {
                this.pecaToast(res.msg, 'danger')
            }
            this.peca = {}
            this.novoButton.status = false
        },
        cancelar() {
            this.peca = {}
            this.novoButton.status = false
        },
        async save (peca) {
            const res = await this.$store.dispatch('savePeca', peca)
            if(res.tipo === 'sucesso') {
                this.pecaToast(res.msg, 'success')
            } else {
                this.pecaToast(res.msg, 'danger')
            }
            this.reset() 
        },
        async remove(peca) {
            const res = await this.$store.dispatch('removePeca', peca)
            if(res.tipo === 'sucesso') {
                this.pecaToast(res.msg, 'success')
            } else {
                this.pecaToast(res.msg, 'danger')
            }
            this.reset()
        }
    },
    mounted() {
        this.peca = {}
        this.novoButton.status = false
    }
}
</script>

<style>
.conteudo-pecas {
    width: 100%;
    display: flex;
}

</style>