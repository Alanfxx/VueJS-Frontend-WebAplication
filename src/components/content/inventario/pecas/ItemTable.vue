<template>
  <div class="item-table-pecas" 
    :class="{'item-color': index%2==0, 'large': mostrarDetalhes}">
    <div>
      <div class="header-item1" v-show="!mostrarDetalhes">
        <img :src="require(`@/assets/pecas/${item.name}.png`)" alt="Imagem da peça" />
        <div class="header-item1-content">
            <div>
                <p>{{item.name}}</p>
                <p>{{item.ref}}</p>
            </div>
            <div><span>{{item.quant}}</span></div>
        </div>
      </div>
    </div>
    <div @click="toggleDetalhes" class="bt-header-item">
      <b-icon
          style="width: 20px; height: 20px; color: #666;"
          icon="chevron-double-down" v-show="!mostrarDetalhes"
      ></b-icon>
      <b-icon
          style="width: 20px; height: 20px; color: #666;"
          icon="chevron-double-up" v-show="mostrarDetalhes"
      ></b-icon>
    </div>
    <ItemDetalhes :item="item" @editar="editar"
      :editing="editing" @remove="$emit('remove')" :mostrarDetalhes="mostrarDetalhes"
    />
  </div>
</template>

<script>
import ItemDetalhes from "./ItemDetalhes";
export default {
  name: "ItemTable",
  props: ["item", "index"],
  components: { ItemDetalhes },
  data: function() {
    return {
      mostrarDetalhes: false,
      editing: { status: false }
    };
  },
  methods: {
    toggleDetalhes() {
      this.editing.status = false;
      this.mostrarDetalhes = !this.mostrarDetalhes;
    },
    editar(item) {
      this.$emit("editar", item);
    }
  }
};
</script>

<style>
.item-table-pecas {
  position: relative;
  width: 290px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* box-shadow: 0 2px #0001; */
  margin: 0 auto;
  transition: 0.2s ease;
  background-color: #fff;
  padding: 5px;
}
.large {
  /* background: rgba(255, 0, 0, 0.25); */
  /* grid-column: auto / span 3; */
  grid-row: auto / span 3;
  /* height: 200px; */
}
.item-table-pecas:hover {
  box-shadow: 0 3px 5px 1px #0002;
}
.item-color {
  background-color: #f8f8f8;
}
.header-item1 {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bt-header-item {
  position: absolute;
  right: 5px;
  bottom: 3px;
  cursor: pointer;
  border-radius: 5px;
  padding: 1px 12px;
}
.bt-header-item:hover {
  background: #0001;
}
.header-item1 img {
  margin: 0 auto;
  height: 100%;
  /* padding: 8px; */
}
.header-item1-content {
  display: flex;
  min-width: 170px;
  padding: 5px 5px 5px 20px;
}
.header-item1-content span {
  font-weight: 600;
  font-size: 1.8rem;
  color: darkslateblue;
}
.header-item1-content p {
  margin-bottom: 8px;
  text-align: left;
  font-weight: 600;
  color: #555;
}
.header-item1-content > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

</style>