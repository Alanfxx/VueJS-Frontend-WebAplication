<template>
  <div class="title-bar">
    <div class="filtros-titlebar">
      Filtrar
      <select name="select" v-model="filtro.tipo">
        <option value="Todos">Todos</option>
        <option value="Capacitor">Capacitor</option>
        <option value="Transistor">Transistor</option>
        <option value="Resistor">Resistor</option>
        <option value="CI">CI</option>
        <option value="Diodo">Diodo</option>
        <option value="LED">LED</option>
        <option value="Flyback">Flyback</option>
      </select>
      <select name="select" v-model="filtro.key">
        <option value="name">Nome</option>
        <option value="ref">Referencia</option>
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
        this.novo.pecas = true;
    }
  }
};
</script>

<style>
.title-bar {
  min-height: 40px;
  padding: 0 30px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: auto;
  color: #333;
  user-select: none;
}
.title-bar > div {
  min-width: 100px;
  text-align: left;
}
.filtros-titlebar {
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* .filtros-titlebar select:hover {
  border: none;
} */
.filtros-titlebar select {
  width: 130px;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>