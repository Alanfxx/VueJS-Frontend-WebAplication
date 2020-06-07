<template>
  <div class="home-page">
    <div>
      <img src="@/assets/luz.gif" alt="Imagem noite lampada" />
    </div>
    <div>
      <Clock class="clock" />
    </div>
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 3fr));
  grid-auto-flow: row dense;
  overflow: auto;
  background: #110f28;
}
.home-page img {
  max-width: 100%;
}
.clock {
  color: #fff;
  margin-top: 100px;
}
@media(max-width: 760px) {
  .clock {
    margin: unset;
  }
}
</style>