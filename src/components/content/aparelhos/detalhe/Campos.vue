<template>
  <div class="campos-aparelho">
    <div>
      <span>Tipo</span>
      <p>{{ctrlAparelho.itemAtual.tipo}}</p>
    </div>
    <div>
      <span>Modelo</span>
      <p>{{ctrlAparelho.itemAtual.modelo}}</p>
    </div>
    <div>
      <span>Marca</span>
      <p>{{ctrlAparelho.itemAtual.marca}}</p>
    </div>
    <div>
      <span>Dono</span>
      <p v-show="!ctrlAparelho.itemAtual.dono">Não informado</p>
      <a href="#" @click="verDono.status=true" v-if="ctrlAparelho.itemAtual.dono">{{ dono.nome }}</a>
    </div>
    <div>
      <span>Data de Entrada</span>
      <p>{{dte}}</p>
    </div>
    <div>
      <span>Data de Saída</span>
      <p>{{dts || '-'}}</p>
    </div>
    <div>
      <span>Estado atual</span>
      <p :style="'color:'+estadoColor(ctrlAparelho.itemAtual.estado)">{{ctrlAparelho.itemAtual.estado}}</p>
    </div>
    <div>
      <span>Descrição</span>
      <p class="descricao">{{ctrlAparelho.itemAtual.descricao}}</p>
    </div>
    <!-- Dono -->
    <Dono :dono="dono" :verDono="verDono" v-show="verDono.status" @fechar="verDono.status=false"/>
  </div>
</template>

<script>
import Dono from './Dono'
export default {
  name: "Campos",
  components: { Dono },
  data: function() {
    return {
      verDono: {status: false},
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho
    }
  },
  methods: {
    estadoColor(estado) {
      if(estado === 'Pendente') {
        return 'orange'
      } else if(estado === 'Consertado') {
        return 'green'
      } else {
        return 'red'
      }
    },
  },
  computed: {
    dte() {
      const timestamp = this.ctrlAparelho.itemAtual.dte
      const dte = this.$store.state.global.formatarData(timestamp)
      return dte
    },
    dts() {
      if(this.ctrlAparelho.itemAtual.dts) {
        const timestamp = this.ctrlAparelho.itemAtual.dts
        const dts = this.$store.state.global.formatarData(timestamp)
        return dts
      } else {
        return null
      }
    },
    dono() {
      if(this.ctrlAparelho.itemAtual.dono){
        const dono = this.$store.getters.clientesList.filter(item => item.id == this.ctrlAparelho.itemAtual.dono)[0]
        return dono ? dono : {}
      } else {
        return {}
      }
    }
  }
};
</script>

<style>
.campos-aparelho {
  height: 100%;
  padding: 10px 10px;
}
.campos-aparelho div {
  display: flex;
}
.campos-aparelho span {
  min-width: 140px;
  color: #999;
  font-size: .9rem;
  font-weight: 600;
}
.campos-aparelho a {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 16px;
}
.campos-aparelho p {
  font-weight: 600;
  font-size: 1.1rem;
  color: #444;
}
p.descricao {
  font-weight: 400;
  font-size: 1rem;
  text-align: justify;
}
@media (max-width: 768px) {
  .campos-aparelho div {
    flex-direction: column;
  }
  .campos-aparelho {
    padding: 10px 0 0 0;
  }
}
</style>