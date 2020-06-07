<template>
  <div class="clientes-pages" :class="{reduce: ctrlGlobal.reduce}">
    <Aside>
      <template v-slot:header>
        <b-icon icon='people-fill' class='h5 mb-0 mr-3'/> Clientes
      </template>
      <template v-slot:content>
        <AsideContent />
      </template>
    </Aside>

    <div class="clientes-content">
      <NovoCliente v-show="ctrlCliente.novo"/>

      <div class="clientes-group" v-show="ctrlCliente.tab === 'todos'">
        <Cliente v-for="(item, i) in clientes" :key="i" :cliente="item" />
      </div>
      <!-- Detalhes -->
      <DetalheCliente v-show="ctrlCliente.tab === 'detalhe'" />
    </div>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
import AsideContent from './AsideContentClientes'
import Cliente from './Cliente.vue'
import NovoCliente from './NovoCliente'
import DetalheCliente from './detalhe/DetalheCliente.vue'

export default {
  name: "clientes-pages",
  components: { Aside, AsideContent, Cliente, NovoCliente, DetalheCliente },
  data: function() {
    return {
      ctrlCliente: this.$store.state.clientes.ctrlCliente,
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    }
  },
  computed: {
    clientes() {
      if(this.ctrlCliente.busca) {
        const filtro = this.ctrlCliente.busca.toUpperCase().trim()
        return this.$store.getters.clientesList.filter( item => 
          item.nome.toUpperCase().includes(filtro) || 
          item.apelido.toUpperCase().includes(filtro)
        )
      } else {
        return this.$store.getters.clientesList
      }
    },
  }
};
</script>

<style>
.clientes-pages {
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "aside content" "aside content";
}
.clientes-content {
  grid-area: content;
  overflow: auto;
}
.clientes-group {
  height: max-content;
  display: flex;
  flex-wrap: wrap;
}
.reduce {
  grid-template-columns: 50px 1fr;
}
</style>