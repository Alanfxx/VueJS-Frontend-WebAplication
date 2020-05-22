<template>
  <div class="aparelhos-pages" :class="{reduce: reduce.status}">
    <Aside :reduce="reduce">
      <template v-slot:header>
        <b-icon icon='plug' class='h5 mb-0 mr-3'/> Aparelhos
      </template>
      <template v-slot:content>
        <!--  -->
      </template>
    </Aside>

    <div class="aparelhos-content">
      <TitleBar title="Aparelhos"/>
      <!--  -->
    </div>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import Aside from "../Aside.vue";

export default {
  name: "AparelhosPages",
  components: { TitleBar, Aside },
  data: function() {
    return {
      reduce: { status: false }
    };
  }
};
</script>

<style>
.aparelhos-pages {
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "aside content" "aside content";
}
.aparelhos-content {
  grid-area: content;
  overflow: auto;
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "titleBar" "content";
}
.reduce {
  grid-template-columns: 50px 1fr;
}
</style>