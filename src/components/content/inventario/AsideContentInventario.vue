<template>
  <div>
    <!-- Busca -->
    <b-input-group class="p-2 my-2" size='sm'>
      <b-input-group-prepend>
        <b-button 
          :id="idToggle"
          variant="outline-dark" @click="buscar">
          <b-icon icon='search' size='sm'></b-icon>
        </b-button>
      </b-input-group-prepend>
      <b-form-input v-show="!ctrlGlobal.reduce" placeholder='Buscar' v-model="ctrlInventario.busca"
        type="text" id='aside-pesquisa-inventario'></b-form-input>
    </b-input-group>
    <!-- ---- -->
    <div class='aside-item-inventario'
      @click="ctrlInventario.tab='pecas'" :class="{'select-inventario': ctrlInventario.tab==='pecas'}">
      <b-icon icon="puzzle" class="h4 mb-0 mr-3" />Peças
    </div>
    <div class='aside-item-inventario'
      @click="ctrlInventario.tab='ferramentas'" :class="{'select-inventario': ctrlInventario.tab==='ferramentas'}">
      <b-icon icon="screwdriver" class="h4 mb-0 mr-3" />Ferramentas
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideContentInventario",
  data: function() {
    return {
      ctrlInventario: this.$store.state.inventario.ctrlInventario,
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    }
  },
  computed: {
    idToggle() {
      if(this.ctrlGlobal.reduce) return 'aside-bt-pesquisa-inventario'
      return ''
    }
  },
  methods: {
    buscar() {
      if(this.ctrlGlobal.reduce === true) {
        this.ctrlGlobal.reduce = false
        setTimeout(() => {
          document.querySelector("#aside-pesquisa-inventario").focus()
        }, 100)
      }
      // ...
    }
  }
};
</script>

<style>
.aside-item-inventario {
  display: flex;
  align-items: center;
  height: 50px;
  min-width: 250px;
  cursor: pointer;
  padding: 0 13px;
}
.aside-item-inventario:hover {
  background: #0002;
}
.select-inventario {
  background: #0001;
  color: darkgreen;
  font-weight: 600;
}
#aside-pesquisa {
  max-width: 500px;
  border: 1px solid #444;
}
#aside-bt-pesquisa-inventario {
  border-radius: 6px;
  border: 1px solid transparent;
}
#aside-bt-pesquisa-inventario:hover {
  background: #0001;
  color: #111;
}
</style>