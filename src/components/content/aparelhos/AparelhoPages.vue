<template>
  <div class="aparelhos-pages" :class="{reduce: reduce.status}">
    <Aside :reduce="reduce">
      <template v-slot:header>
        <b-icon icon='plug' class='h5 mb-0 mr-3'/> Aparelhos
      </template>
      <template v-slot:content>
        <!--  -->
      </template>
    </Aside>

    <div class="aparelhos-content">
      <!-- Todos os aparelhos -->
      <div class="aparelhos-group" v-show="page === 'aparelhos'">
        <Aparelho v-for="item in aparelhos" :key="item.tipo" :aparelho="item"
          @detalhe="detalhe(item)"/>
      </div>
      <!-- Detalhes -->
      <DetalheAparelho :aparelho="itemAtual" v-show="page === 'detalhe'"
        @fechar="page = 'aparelhos'"/>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside.vue";
import Aparelho from "./Aparelho"
import DetalheAparelho from "./detalhe/DetalheAparelho"

export default {
  name: "AparelhosPages",
  components: { Aside, Aparelho, DetalheAparelho },
  data: function() {
    return {
      reduce: { status: false },
      page: 'aparelhos',
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
    aparelhos() {
      return this.$store.getters.aparelhosList
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
  /* justify-content: center; */
}
.reduce {
  grid-template-columns: 50px 1fr;
}
</style>