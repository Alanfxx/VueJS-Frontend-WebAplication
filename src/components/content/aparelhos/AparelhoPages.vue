<template>
  <div class="aparelhos-pages" :class="{reduce: ctrlGlobal.reduce}">
    <Aside>
      <template v-slot:header>
        <b-icon icon='plug' class='h5 mb-0 mr-3'/> Aparelhos
      </template>
      <template v-slot:content>
        <AsideContentAparelhos />
      </template>
    </Aside>

    <div class="aparelhos-content">
      <NovoAparelho v-show="ctrlAparelho.novo" />
      <!-- Todos os aparelhos -->
      <div class="aparelhos-group" v-show="ctrlAparelho.tab === 'todos'">
        <Aparelho v-for="(item, i) in aparelhos" :key="i" :aparelho="item" />
      </div>
      <div class="aparelhos-group" v-show="ctrlAparelho.tab === 'pendentes'">
        <Aparelho v-for="(item, i) in aparelhosPendentes" :key="i" :aparelho="item" />
      </div>
      <div class="aparelhos-group" v-show="ctrlAparelho.tab === 'consertados'">
        <Aparelho v-for="(item, i) in aparelhosConsertados" :key="i" :aparelho="item" />
      </div>
      <div class="aparelhos-group" v-show="ctrlAparelho.tab === 'sem conserto'">
        <Aparelho v-for="(item, i) in aparelhosSemConserto" :key="i" :aparelho="item" />
      </div>
      <!-- Detalhes -->
      <DetalheAparelho v-show="ctrlAparelho.tab === 'detalhe'"/>
      <!-- Editar -->
      <EditarAparelho v-show="ctrlAparelho.editar"/>
      <EditarEstado v-show="ctrlAparelho.editarEstado"/>
    </div>
  </div>
</template>

<script>
import Aside from "./Aside"
import NovoAparelho from './NovoAparelho'
import Aparelho from "./Aparelho"
import DetalheAparelho from "./detalhe/DetalheAparelho"
import AsideContentAparelhos from "./AsideContentAparelhos"
import EditarAparelho from './EditarAparelho'
import EditarEstado from './EditarEstado'

export default {
  name: "AparelhosPages",
  components: { EditarEstado, Aside, NovoAparelho, Aparelho, DetalheAparelho, AsideContentAparelhos, EditarAparelho },
  data: function() {
    return {
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho,
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    }
  },
  computed: {
    aparelhos() {
      if(this.ctrlAparelho.busca) {
        const filtro = this.ctrlAparelho.busca.toUpperCase().trim()
        return this.$store.getters.aparelhosList.filter( item => 
          item.tipo.toUpperCase().includes(filtro) || 
          item.modelo.toUpperCase().includes(filtro) ||
          item.marca.toUpperCase().includes(filtro) ||
          item.estado.toUpperCase().includes(filtro) ||
          item.descricao.toUpperCase().includes(filtro)
        )
      } else {
        return this.$store.getters.aparelhosList
      }
    },
    aparelhosPendentes() {
      return this.aparelhos.filter(item => item.estado === 'Pendente')
    },
    aparelhosConsertados() {
      return this.aparelhos.filter(item => item.estado === 'Consertado')
    },
    aparelhosSemConserto() {
      return this.aparelhos.filter(item => item.estado === 'Sem conserto')
    }
  }
};
</script>

<style>
.aparelhos-pages {
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "aside content" "aside content";
}
.aparelhos-content {
  grid-area: content;
  overflow: auto;
}
.aparelhos-group {
  height: max-content;
  display: flex;
  flex-wrap: wrap;
}
.reduce {
  grid-template-columns: 50px 1fr;
}
</style>