<template>
    <div class="tap-ferramentas">
            <!-- Formulario novo -->
        <FormularioNovo :tabAtual='tabAtual' :novo="novo"
            @salvar='save'/>
            <!-- Tabela dos itens -->
        <div class="conteudo-ferramentas">
            <TableContainer>
                <ItemTable v-for="(item, i) in ferramentas" :key="i" :item="item" :index="i"
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
    name: 'TapFerramentas',
    components: { TableContainer, ItemTable, FormularioNovo },
    props: ['novo'],
    data: function() {
        return {
            tabAtual: 'ferramentas'
        }
    },
    computed: {
        ferramentas() {
            return this.$store.getters.ferramentasList
        }
    },
    methods: {
        ferramentaToast(msg, variant) {
            this.$bvToast.toast(msg || 'Sem mensagem', {
                title: 'Inventário',
                variant: variant,
                solid: true
            })
        },
        async reset() {
            const res = await this.$store.dispatch('loadFerramentas')
            if(res.tipo === 'erro') {
                return this.ferramentaToast(res.msg, 'danger')
            }
            this.novo.ferramentas = false
        },
        async save (ferramenta) {
            const res = await this.$store.dispatch('saveFerramenta', ferramenta)
            if(res.tipo === 'sucesso') {
                this.ferramentaToast(res.msg, 'success')
                this.reset()
            } else {
                this.ferramentaToast(res.msg, 'danger')
            }
        },
        async remove(ferramenta) {
            const res = await this.$store.dispatch('removeFerramenta', ferramenta)
            if(res.tipo === 'sucesso') {
                this.ferramentaToast(res.msg, 'success')
                this.reset()
            } else {
                this.ferramentaToast(res.msg, 'danger')
            }
        }
    }
}
</script>

<style>
.tap-ferramentas {
    grid-area: content;
}
</style>