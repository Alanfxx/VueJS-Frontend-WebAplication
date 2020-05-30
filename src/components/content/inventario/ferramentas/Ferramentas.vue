<template>
    <div class="tap-ferramentas">
            <!-- Formulario novo -->
        <FormularioNovo :tabAtual='tabAtual' :novo="novo"
            @salvar='save'/>
            <!-- Tabela dos itens -->
        <div class="conteudo-ferramentas">
            <ItemTable v-for="(item, i) in ferramentas" :key="i" :item="item" :index="i"
                @editar='save' @remove='remove(item)'/>
        </div>
    </div>
</template>

<script>
import FormularioNovo from './FormularioNovo'
import ItemTable from './ItemTable'


export default {
    name: 'TapFerramentas',
    components: { ItemTable, FormularioNovo },
    data: function() {
        return {
            tabAtual: 'ferramentas',
            novo: {pecas: false, ferramentas: false}
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
/* .tap-ferramentas {
} */
</style>