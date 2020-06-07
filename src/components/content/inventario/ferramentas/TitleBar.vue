<template>
  <div class="title-bar-ferramentas">
    <div class="filtros-titlebar-ferramentas">
      Filtrar
      <select name="select" v-model="filtro.tipo">
        <option value="Todos">Todos</option>
      </select>
      <select name="select" v-model="filtro.key">
        <option value="name">Nome</option>
        <option value="quant">Quantidade</option>
      </select>
      <select name="select" v-model="filtro.order">
        <option value='cresc'>Crescente</option>
        <option value='decr'>Decrescente</option>
      </select>
    </div>
    <b-button class="px-3 py-1" size="sm" pill variant="outline-success" @click="alterarNovo">Novo</b-button>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: ["novo", "filtro"],
  methods: {
    alterarNovo() {
        this.novo.status = true;
    }
  }
};
</script>

<style>
.title-bar-ferramentas {
  min-height: 40px;
  padding: 0 30px;
  background: rgb(237,242,247);
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  user-select: none;
}
.filtros-titlebar-ferramentas {
  min-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px 0;
}
.filtros-titlebar-ferramentas select {
  width: 130px;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 3px;
  margin: 0 10px;
  margin-top: 2px;
}
</style>