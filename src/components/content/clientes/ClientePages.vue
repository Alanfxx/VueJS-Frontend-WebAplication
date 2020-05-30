<template>
  <div class="clientes-pages" :class="{reduce: reduce.status}">
    <Aside :reduce="reduce">
      <template v-slot:header>
        <b-icon icon='people-fill' class='h5 mb-0 mr-3'/> Clientes
      </template>
      <template v-slot:content>
        <!--  -->
      </template>
    </Aside>

    <div class="clientes-content">
      <div class="clientes-group" v-show="page === 'clientes'">
        <Cliente v-for="item in clientes" :key="item.name" :cliente="item"
          @detalhe="detalhe(item)"/>
      </div>
      <!-- Detalhes -->
      <DetalheCliente :cliente="itemAtual" v-show="page === 'detalhe'"
        @fechar="page = 'clientes'"/>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside.vue";
import Cliente from './Cliente.vue'
import DetalheCliente from './detalhe/DetalheCliente.vue'

export default {
  name: "clientes-pages",
  components: { Aside, Cliente, DetalheCliente },
  data: function() {
    return {
      reduce: { status: false },
      page: 'clientes',
      itemAtual: {}
    };
  },
  methods: {
    detalhe(item) {
      this.page = 'detalhe'
      this.itemAtual = { ...item }
    }
  },
  computed: {
    clientes() {
      return this.$store.getters.clientesList
    }
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