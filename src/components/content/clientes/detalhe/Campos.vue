<template>
  <div class="campos-cliente">
    <div>
      <span>Nome</span>
      <p>{{ctrlCliente.itemAtual.nome}}</p>
    </div>
    <div>
      <span>Apelido</span>
      <p>{{ctrlCliente.itemAtual.apelido}}</p>
    </div>
    <div>
      <span>Cidade</span>
      <p>{{ctrlCliente.itemAtual.cidade}}</p>
    </div>
    <div>
      <span>Telefone</span>
      <p>{{ctrlCliente.itemAtual.tels}}</p>
    </div>
    <div v-if="aparelhos.length > 0">
      <span>Aparelhos</span>
      <div class="cliente-aparelhos">
        <div v-for="(ap, i) in aparelhos" :key='i'>
          <span>{{ap.tipo}} {{ap.marca}} - {{ap.modelo}}</span>
          <span :style="'color:'+estadoColor(ap.estado)">{{ap.estado}}</span>
          <b-icon id="bt-campo-cliente" icon='box-arrow-in-up-left'
            @click="detalheAp(ap)"></b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Campos",
  data: function() {
    return {
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho,
      ctrlCliente: this.$store.state.clientes.ctrlCliente
    }
  },
  computed: {
    aparelhos() {
      if(this.ctrlCliente.itemAtual.nome) {
        return this.$store.getters.aparelhosList.filter(item => {
          let contem = false
          this.ctrlCliente.itemAtual.aparelhos.forEach(apId => {
            if(apId === item.id) contem = true
          })
          return contem
        })
      }
      return []
    }
  },
  methods: {
    detalheAp(ap) {
      this.ctrlAparelho.tab = 'detalhe'
      this.ctrlAparelho.itemAtual = { ...ap }
      this.$router.push({ path: "/aparelhos" })
    },
    estadoColor(estado) {
      if(estado === 'Pendente') {
        return 'orange'
      } else if(estado === 'Consertado') {
        return 'green'
      } else {
        return 'red'
      }
    },
  }
};
</script>

<style>
.campos-cliente {
  height: 100%;
  padding: 10px 10px;
}
.campos-cliente > div {
  display: flex;
}
.campos-cliente span {
  min-width: 140px;
  color: #999;
  font-size: .9rem;
  font-weight: 600;
  padding: 2px;
}
.campos-cliente p {
  font-weight: 600;
  font-size: 1.1rem;
  color: #444;
  padding: 2px;
}
.cliente-aparelhos {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.cliente-aparelhos > div > span {
  color: rgb(33, 90, 165);
}
#bt-campo-cliente {
  width: 22px;
  height: 22px;
  color: cornflowerblue;
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
}
.cliente-aparelhos > div:hover {
  border-color: limegreen;
}
.cliente-aparelhos > div {
  position: relative;
  border: 1px solid rgb(207, 219, 231);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  /* cursor: grab; */
}
@media (max-width: 768px) {
  .campos-cliente div {
    flex-direction: column;
  }
  .campos-cliente {
    padding: 10px 0 0 0;
  }
}
</style>