<template>
  <div class="home-page">
    <Clock class="clock" />
    <img src="@/assets/web-contrucao.svg" alt="Logo" class="imagem-home" />
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
    justify-content: space-evenly;
    padding: 0 10px;
}
.clock {
    margin-top: 50px;
}
.imagem-home {
    max-width: 100%;
    max-height: 500px;
}
</style>