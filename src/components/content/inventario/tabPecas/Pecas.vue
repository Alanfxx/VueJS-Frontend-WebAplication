<template>
    <div class="tab-pecas">
            <!-- Formulario novo -->
        <FormularioNovo :tabAtual='tabAtual' @salvar='saveCallback'/>
            <!-- Tabela dos itens -->
        <div class="conteudo-pecas">
            <PecaTable>
                <PecaItemTable v-for="(item, i) in pecas" :key="i" :peca="item" :index="i"
                    @editar='save(item)' @remove='remove(item)'/>
            </PecaTable>
        </div>
    </div>
</template>

<script>
import FormularioNovo from '../FormularioNovo'
import PecaTable from './PecaTable'
import PecaItemTable from './PecaItemTable'


export default {
    name: 'TabPecas',
    components: { PecaTable, PecaItemTable, FormularioNovo },
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
.conteudo-pecas {
    width: 100%;
    display: flex;
}

</style>