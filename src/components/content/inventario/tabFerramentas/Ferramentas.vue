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
                        <b-button variant="success" @click="save(ferramenta)">Salvar</b-button>
                        <b-button @click="cancelar" class="ml-2">Cancelar</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <!-- =============== -->
        <div class="conteudo-ferramentas">
            <!-- Tabela dos itens -->
            <FerramentaTable>
                <FerramentaItemTable v-for="(item, i) in ferramentas" :key="i" :ferramenta="item" :index="i"
                    @editar='save(item)' @remove='remove(item)'/>
            </FerramentaTable>
        </div>
    </div>
</template>

<script>
import FerramentaTable from './FerramentaTable'
import FerramentaItemTable from './FerramentaItemTable'


export default {
    name: 'TapFerramentas',
    components: { FerramentaTable, FerramentaItemTable },
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
            ]
        }
    },
    watch: {
        novoButton: {
            deep: true,
            handler: function() {
                if(this.novoButton.status) {
                    this.ferramenta = {}
                }
            }
        }
    },
    methods: {
        ferramentaToast(msg, variant) {
            this.$bvToast.toast(msg || 'Sem mensagem', {
                title: 'Autenticação',
                variant: variant,
                solid: true
            })
        },
        async reset() {
            const res = await this.$store.dispatch('loadFerramentas')
            if(res.tipo === 'erro') {
                this.ferramentaToast(res.msg, 'danger')
            }
            this.ferramenta = {}
            this.novoButton.status = false
        },
        cancelar() {
            this.ferramenta = {}
            this.novoButton.status = false
        },
        async save (ferramenta) {
            const res = await this.$store.dispatch('saveFerramenta', ferramenta)
            if(res.tipo === 'sucesso') {
                this.ferramentaToast(res.msg, 'success')
            } else {
                this.ferramentaToast(res.msg, 'danger')
            }
            this.reset()
        },
        async remove(ferramenta) {
            const res = await this.$store.dispatch('removeFerramenta', ferramenta)
            if(res.tipo === 'sucesso') {
                this.ferramentaToast(res.msg, 'success')
            } else {
                this.ferramentaToast(res.msg, 'danger')
            }
            this.reset()
        }
    },
    mounted() {
        this.ferramenta = {}
        this.novoButton.status = false
    }
}
</script>

<style>
.conteudo-ferramentas {
    width: 100%;
    display: flex;
}
</style>