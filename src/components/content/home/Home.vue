<template>
  <div class="home-page">
    <Clock class="clock" />
    <img src="@/assets/imagem-home.png" class="imagem-home" alt="Imagem eletronicos"/>
  </div>
</template>

<script>
import Clock from "./Clock";

export default {
  components: { Clock }
};
</script>

<style>
.home-page {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: space-evenly;
  padding: 10px;
  background: rgba(0, 255, 21, 0.1);
}
.clock {
  padding-top: 50px;
  max-height: 100%;
}
img.imagem-home {
  position: relative;
  max-width: 100%;
  max-height: 400px;
  padding-top: 20px;
}
</style>