<template>
    <div class="tab-ferramentas">
        <TitleBar title="Ferramentas" :novo="novo" 
            :filtro="filtro" @filtrar="filtrar"/>
            <!-- Formulario novo -->
        <FormularioNovo :novo="novo"
            @salvar='save'/>
            <!-- Tabela dos itens -->
        <div class="conteudo-ferramentas">
            <ItemTable v-for="(item, i) in ferramentas" :key="i" :item="item" :index="i"
                @editar='save' @remove='remove(item)'/>
        </div>
    </div>
</template>

<script>
import TitleBar from './TitleBar'
import FormularioNovo from './FormularioNovo'
import ItemTable from './ItemTable'

export default {
    name: 'TabFerramentas',
    components: { TitleBar, ItemTable, FormularioNovo },
    data: function() {
        return {
            ctrlInventario: this.$store.state.inventario.ctrlInventario,
            novo: {status: false},
            filtro: {tipo: 'Todos', key: null, order: null}
        }
    },
    watch: {
        filtro: {
            deep: true,
            handler() {
                this.filtrar()
            }
        }
    },
    computed: {
        ferramentas() {
            if(this.ctrlInventario.busca) {
                const filtro = this.ctrlInventario.busca.toUpperCase().trim()
                return this.$store.getters.ferramentasFiltradas.filter( item => 
                    item.name.toUpperCase().includes(filtro)
                )
            } else {
                return this.$store.getters.ferramentasFiltradas
            }
        }
    },
    methods: {
        filtrar() {
            if(this.filtro.key === null) this.filtro.key = 'name'
            if(this.filtro.order === null) this.filtro.order = 'cresc'
            this.$store.dispatch('ferramentasSortBy', this.filtro )
        },
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
            this.filtrar()
            this.novo.status = false
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
.tab-ferramentas {
  display: flex;
  flex-direction: column;
}
.conteudo-ferramentas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 290px));
  grid-gap: 10px;
  grid-auto-flow: row dense;
  padding: 10px;
}
</style>