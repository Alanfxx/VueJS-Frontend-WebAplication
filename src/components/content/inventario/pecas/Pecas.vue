<template>
  <div class="tab-pecas">
    <TitleBar title="Peças" :novo="novo" 
      :filtro="filtro" @filtrar="filtrar"/>
    <!-- Formulario novo -->
    <FormularioNovo :tabAtual="tabAtual" :novo="novo" @salvar="save" />
    <!-- Tabela dos itens -->
    <div class="conteudo-pecas">
      <ItemTable
        v-for="(item, i) in pecas"
        :key="i"
        :item="item"
        :index="i"
        @editar="save"
        @remove="remove(item)"
      />
    </div>
  </div>
</template>

<script>
import TitleBar from './TitleBar'
import FormularioNovo from "./FormularioNovo";
import ItemTable from "./ItemTable";

export default {
  name: "TabPecas",
  components: { TitleBar, ItemTable, FormularioNovo },
  data: function() {
    return {
      tabAtual: "pecas",
      novo: {pecas: false, ferramentas: false},
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
    pecas() {
      return this.$store.getters.pecasFiltradas
    }
  },
  methods: {
    filtrar() {
      if(this.filtro.tipo === null) this.filtro.tipo = 'Todos'
      if(this.filtro.key === null) this.filtro.key = 'name'
      if(this.filtro.order === null) this.filtro.order = 'cresc'
      this.$store.dispatch('arraySortBy', this.filtro )
    },
    pecaToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Inventário",
        variant: variant,
        solid: true
      });
    },
    async reset() {
      const res = await this.$store.dispatch("loadPecas");
      if (res.tipo === "erro") {
        return this.pecaToast(res.msg, "danger");
      }
      this.filtrar()
      this.novo.pecas = false;
    },
    async save(peca) {
      const res = await this.$store.dispatch("savePeca", peca);
      if (res.tipo === "sucesso") {
        this.pecaToast(res.msg, "success");
        this.reset();
      } else {
        this.pecaToast(res.msg, "danger");
      }
    },
    async remove(peca) {
      const res = await this.$store.dispatch("removePeca", peca);
      if (res.tipo === "sucesso") {
        this.pecaToast(res.msg, "success");
        this.reset();
      } else {
        this.pecaToast(res.msg, "danger");
      }
    }
  }
};
</script>

<style>
/* .tab-pecas {
} */
.conteudo-pecas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  grid-gap: 10px 0;
  grid-auto-flow: row dense;
  padding: 10px;
}
</style>