<template>
  <div class="inventario-pages" :class="{reduce: reduce.status}">
    <Aside :reduce="reduce">
      <template v-slot:header>
        <b-icon icon='tools' class='h5 mb-0 mr-3'/> Inventário
      </template>
      <template v-slot:content>
        <AsideContent :tab="tab"
          @pecas="tab='Peças'"
          @ferramentas="tab='Ferramentas'" />
      </template>
    </Aside>

    <div class="inventario-content">
      <TitleBar :title="tab" :novo="novo"/>
      <Pecas v-show="tab==='Peças'" :novo="novo"/>
      <Ferramentas v-show="tab==='Ferramentas'" :novo="novo"/>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside.vue";
import AsideContent from './AsideContentInventario.vue'
import TitleBar from "../TitleBar.vue";
import Pecas from "./Pecas";
import Ferramentas from "./Ferramentas";

export default {
  name: "InventarioPages",
  components: { TitleBar, Pecas, Ferramentas, Aside, AsideContent },
  data: function() {
    return {
      reduce: { status: false },
      novo: {pecas: false, ferramentas: false},
      tab: 'Peças'
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
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "titleBar" "content";
}
.reduce {
  grid-template-columns: 50px 1fr;
}
</style>