<template>
  <div class="title-bar-pecas">
    <div class="filtros-titlebar-pecas">
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
        this.novo.status = true;
    }
  }
};
</script>

<style>
.title-bar-pecas {
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
.filtros-titlebar-pecas {
  min-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px 0;
}
.filtros-titlebar-pecas select {
  width: 130px;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 3px;
  margin: 0 10px;
  margin-top: 2px;
}
</style>