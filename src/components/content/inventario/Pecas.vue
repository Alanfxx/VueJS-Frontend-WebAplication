<template>
    <div class="tab-pecas">
            <!-- Formulario novo -->
        <FormularioNovo :tabAtual='tabAtual' @salvar='saveCallback'/>
            <!-- Tabela dos itens -->
        <div class="conteudo-pecas">
            <TableContainer :tabAtual='tabAtual'>
                <ItemTable v-for="(item, i) in pecas" :key="i" :item="item" :index="i"
                    @editar='save' @remove='remove(item)'/>
            </TableContainer>
        </div>
    </div>
</template>

<script>
import FormularioNovo from './comum/FormularioNovo'
import TableContainer from './comum/TableContainer'
import ItemTable from './comum/ItemTable'


export default {
    name: 'TabPecas',
    components: { TableContainer, ItemTable, FormularioNovo },
    data: function() {
        return {
            tabAtual: 'pecas'
        }
    },
    computed: {
        pecas() {
            return this.$store.getters.pecasList
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
        async saveCallback({data, cb}){
            await this.save(data)
            cb()
        },
        async reset() {
            const res = await this.$store.dispatch('loadPecas')
            if(res.tipo === 'erro') {
                this.pecaToast(res.msg, 'danger')
            }
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
    }
}
</script>

<style>
.tab-pecas {
    grid-area: content;
}
</style>