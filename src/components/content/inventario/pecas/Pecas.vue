<template>
  <div class="tab-pecas">
    <TitleBar title="Peças" :novo="novo" 
      :filtro="filtro" @filtrar="filtrar"/>
    <!-- Formulario novo -->
    <FormularioNovo :novo="novo" @salvar="save" />
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
    pecas() {
      if(this.ctrlInventario.busca) {
        const filtro = this.ctrlInventario.busca.toUpperCase().trim()
        return this.$store.getters.pecasFiltradas.filter( item => 
          item.name.toUpperCase().includes(filtro) || 
          item.ref.toUpperCase().includes(filtro)
        )
      } else {
        return this.$store.getters.pecasFiltradas
      }
    }
  },
  methods: {
    filtrar() {
      if(this.filtro.key === null) this.filtro.key = 'name'
      if(this.filtro.order === null) this.filtro.order = 'cresc'
      this.$store.dispatch('pecasSortBy', this.filtro )
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
      this.novo.status = false;
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
.tab-pecas {
  display: flex;
  flex-direction: column;
}
.conteudo-pecas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 290px));
  grid-gap: 10px;
  grid-auto-flow: row dense;
  padding: 10px;
}
</style>