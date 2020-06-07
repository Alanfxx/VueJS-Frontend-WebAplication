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
      <b-form-input v-show="!ctrlGlobal.reduce" placeholder='Buscar' v-model="ctrlAparelho.busca"
        type="text" id='aside-pesquisa'></b-form-input>
    </b-input-group>
    <!-- ---- -->
    <div class='aside-item-aparelhos bt-novo-aparelho'
      @click="ctrlAparelho.novo=true">
      <b-icon icon="plus-square" class="h4 mb-0 mr-3" />Novo
    </div>
    <div class='aside-item-aparelhos'
      @click="ctrlAparelho.tab = 'todos'" :class="{'select-aparelho': ctrlAparelho.tab==='todos'}">
      <b-icon icon="clipboard" class="h4 mb-0 mr-3" />Todos
    </div>
    <div class='aside-item-aparelhos'
      @click="ctrlAparelho.tab = 'pendentes'" :class="{'select-aparelho': ctrlAparelho.tab==='pendentes'}">
      <b-icon icon="exclamation-diamond" class="h4 mb-0 mr-3" />Pendentes
    </div>
    <div class='aside-item-aparelhos'
      @click="ctrlAparelho.tab = 'consertados'" :class="{'select-aparelho': ctrlAparelho.tab==='consertados'}">
      <b-icon icon="check-all" class="h4 mb-0 mr-3" />Consertados
    </div>
    <div class='aside-item-aparelhos'
      @click="ctrlAparelho.tab = 'sem conserto'" :class="{'select-aparelho': ctrlAparelho.tab==='sem conserto'}">
      <b-icon icon="flag" class="h4 mb-0 mr-3" />Sem conserto
    </div>
    <div class="filtros-aparelhos" v-show="!ctrlGlobal.reduce">
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
    <div class='aside-item-aparelhos' v-show="ctrlGlobal.reduce"
      @click="ctrlGlobal.reduce = false">
      <b-icon icon="funnel" class="h4 mb-0 mr-3" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideContentAparelhos",
  data: function() {
    return {
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho,
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
.aside-item-aparelhos {
  display: flex;
  align-items: center;
  height: 50px;
  min-width: 250px;
  cursor: pointer;
  padding: 0 13px;
}
.aside-item-aparelhos:hover {
  background: #0001;
}
.bt-novo-aparelho {
  color: darkgreen;
}
.bt-novo-aparelho:hover {
  background: unset;
  color: limegreen;
  /* font-weight: 600; */
}
.select-aparelho {
  background: #0003;
  color: darkblue;
  font-weight: 600;
}
.filtros-aparelhos {
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
.filtros-aparelhos select {
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