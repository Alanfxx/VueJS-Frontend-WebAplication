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
      <b-form-input v-show="!ctrlGlobal.reduce" placeholder='Buscar' v-model="ctrlCliente.busca"
        type="text" id='aside-pesquisa'></b-form-input>
    </b-input-group>
    <!-- ---- -->
    <div class='aside-item-clientes bt-novo-cliente'
      @click="ctrlCliente.novo=true">
      <b-icon icon="plus-square" class="h4 mb-0 mr-3" />Novo
    </div>
    <div class='aside-item-clientes'
      @click="ctrlCliente.tab='todos'" :class="{'select-cliente': ctrlCliente.tab==='todos'}">
      <b-icon icon="clipboard" class="h4 mb-0 mr-3" />Todos
    </div>
    <div class="filtros-clientes" v-show="!ctrlGlobal.reduce">
      Filtrar
      <select name="select" disabled>
        <option value="Todos">Todos</option>
        <option value="TV">TV</option>
        <option value="Som">Som</option>
        <option value="Celular">Celular</option>
        <option value="Notebook">Notebook</option>
        <option value="Roteador">Roteador</option>
        <option value="Camera">Camera</option>
      </select>
      <select name="select" disabled>
        <option value="tipo">Tipo</option>
        <option value="marca">Marca</option>
        <option value="modelo">Modelo</option>
        <option value="data">Data</option>
      </select>
      <select name="select" disabled>
        <option value='cresc'>Crescente</option>
        <option value='decr'>Decrescente</option>
      </select>
    </div>
    <div class='aside-item-clientes' v-show="ctrlGlobal.reduce"
      @click="ctrlGlobal.reduce = false">
      <b-icon icon="funnel" class="h4 mb-0 mr-3" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideContentClientes",
  data: function() {
    return {
      ctrlCliente: this.$store.state.clientes.ctrlCliente,
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    }
  },
  computed: {
    idToggle() {
      if(this.ctrlGlobal.reduce) return 'aside-bt-pesquisa'
      return ''
    }
  },
  methods: {
    buscar() {
      if(this.ctrlGlobal.reduce === true) {
        this.ctrlGlobal.reduce = false
        setTimeout(() => {
          document.querySelector("#aside-pesquisa").focus()
        }, 100)
      }
      // ...
    }
  }
};
</script>

<style>
.aside-item-clientes {
  display: flex;
  align-items: center;
  height: 50px;
  min-width: 250px;
  cursor: pointer;
  padding: 0 13px;
}
.aside-item-clientes:hover {
  background: #0001;
}
.bt-novo-cliente {
  color: darkgreen;
}
.bt-novo-cliente:hover {
  background: unset;
  color: limegreen;
  /* font-weight: 600; */
}
.select-cliente {
  background: #0003;
  color: darkblue;
  font-weight: 600;
}
.filtros-clientes {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 13px;
  background: #0000000f;
  border-radius: 5px;
  margin: 10px 5px;
  color: #0008;
  text-align: left;
  font-size: 1rem;
}
.filtros-clientes select {
  color: #000e;
  border: 1px solid #0003;
  padding: 3px 1px;
  border-radius: 4px;
}
#aside-pesquisa {
  max-width: 500px;
  border: 1px solid #444;
}
#aside-bt-pesquisa {
  border-radius: 6px;
  border: 1px solid transparent;
}
#aside-bt-pesquisa:hover {
  background: #0001;
  color: #111;
}
</style>