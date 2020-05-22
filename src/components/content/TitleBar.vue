<template>
  <div class="title-bar">
    <div>
        <!-- <b-icon class="mr-1" :icon="icon"></b-icon> -->
        {{ title }}
    </div>
    <b-button class="px-3 py-1" size="sm" pill variant="outline-success" 
      @click="alterarNovo">Novo</b-button>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: ["title", "novo"],
  methods: {
    alterarNovo() {
      if(this.title === 'Peças') {
        this.novo.pecas = true;
      } else if(this.title === 'Ferramentas') {
        this.novo.ferramentas = true;
      }
    }
  }
};
</script>

<style>
.title-bar {
  grid-area: titleBar;
  padding: 0 30px;
  /* background-color: rgb(238, 255, 238); */
  border-bottom: 1px solid rgb(203, 221, 203);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: auto;
  color: #333;
  user-select: none;
}
.title-bar > div{
  min-width: 100px;
  text-align: left;
}
</style>