<template>
  <div class="clientes-pages" :class="{reduce: reduce.status}">
    <Aside :reduce="reduce">
      <template v-slot:header>
        <b-icon icon='people-fill' class='h5 mb-0 mr-3'/> Clientes
      </template>
      <template v-slot:content>
        <!--  -->
      </template>
    </Aside>

    <div class="clientes-content">
      <TitleBar title="Clientes"/>
      <!--  -->
    </div>
  </div>
</template>

<script>
import Aside from "../Aside.vue";
import TitleBar from "../TitleBar.vue";

export default {
  name: "clientes-pages",
  components: { TitleBar, Aside },
  data: function() {
    return {
      reduce: { status: false }
    };
  }
};
</script>

<style>
.clientes-pages {
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "aside content" "aside content";
}
.clientes-content {
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