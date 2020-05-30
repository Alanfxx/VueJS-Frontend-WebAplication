<template>
  <div class="aside-content-inventario">
    <div class='aside-item'
      @click="$emit('pecas')" :class="{select: tab==='Peças'}">
      <b-icon icon="puzzle" class="h4 mb-0 mr-3" />Peças
    </div>
    <div class='aside-item'
      @click="$emit('ferramentas')" :class="{select: tab==='Ferramentas'}">
      <b-icon icon="screwdriver" class="h4 mb-0 mr-3" />Ferramentas
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideContentInventario",
  props: ["tab"]
};
</script>

<style>
.aside-item {
  display: flex;
  align-items: center;
  height: 50px;
  min-width: 250px;
  cursor: pointer;
  padding: 0 13px;
}
.aside-item:hover {
  background: #0002;
}
.select {
  background: #0001;
  color: darkgreen;
}
</style>