<template>
  <div class="inventario-pages" :class="{reduce: ctrlGlobal.reduce}">
    <Aside>
      <template v-slot:header>
        <b-icon icon='tools' class='h5 mb-0 ml-2 mr-3'/> Inventário
      </template>
      <template v-slot:content>
        <AsideContent />
      </template>
    </Aside>

    <div class="inventario-content">
      <Pecas v-show="ctrlInventario.tab==='pecas'" />
      <Ferramentas v-show="ctrlInventario.tab==='ferramentas'" />
    </div>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
import AsideContent from './AsideContentInventario.vue'
import Pecas from "./pecas/Pecas";
import Ferramentas from "./ferramentas/Ferramentas";

export default {
  name: "InventarioPages",
  components: { Pecas, Ferramentas, Aside, AsideContent },
  data: function() {
    return {
      ctrlInventario: this.$store.state.inventario.ctrlInventario,
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    };
  }
};
</script>

<style>
.inventario-pages {
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "aside content" "aside content";
}
.inventario-content {
  grid-area: content;
  overflow: auto;
  /* display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "titleBar" "content"; */
}
.reduce {
  grid-template-columns: 50px 1fr;
}
</style>