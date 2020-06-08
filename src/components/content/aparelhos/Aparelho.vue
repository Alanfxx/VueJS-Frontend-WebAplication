<template>
  <div class="aparelho">
    <div class="imagem-aparelho">
      <img :src="require(`@/assets/aparelhos/${aparelho.tipo}.png`)" alt="Imagem do aparelho"/>
    </div>
    <div class="dados-aparelho">
      <div class="aparelho-campos">
        <div>
          <span></span>
          <p>{{aparelho.tipo}}</p>
        </div>
        <div>
          <span>Dono</span>
          <p>{{dono.nome ? dono.nome : '-'}}</p>
        </div>
        <div>
          <span>Estado</span>
          <p :style="'color:'+estadoColor">{{aparelho.estado}}</p>
        </div>
      </div>
      <span class="bt-detalhe-aparelho" @click="detalhe">
        <b-icon icon="aspect-ratio" class="mb-0 mt-0"></b-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aparelho",
  props: ["aparelho"],
  data: function() {
    return {
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho
    }
  },
  methods: {
    detalhe() {
      this.ctrlAparelho.tab = 'detalhe'
      this.ctrlAparelho.itemAtual = { ...this.aparelho }
    },
  },
  computed: {
    dono() {
      if(this.aparelho.dono){
        const dono = this.$store.getters.clientesList.filter(item => item.id == this.aparelho.dono)[0]
        return dono ? dono : {}
      } else {
        return {}
      }
    },
    estadoColor() {
      if(this.aparelho.estado === 'Pendente') {
        return 'orange'
      } else if(this.aparelho.estado === 'Consertado') {
        return 'green'
      } else {
        return 'red'
      }
    }
  }
}
</script>

<style>
.aparelho {
  width: 290px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "img content";
  border-radius: 4px;
  border: 2px solid transparent;
  margin: 10px;
  transition: 400ms ease;
  background: rgb(237,242,247);
  box-shadow: 2px 2px 2px #0002;
}
.aparelho:hover {
  border: 2px solid limegreen;
}
.imagem-aparelho {
  grid-area: img;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.imagem-aparelho > img {
  position: relative;
  max-width: 100%;
  max-height: 120%;
  /* border-radius: 50%; */
}
.dados-aparelho {
  grid-area: content;
  position: relative;
  padding: 8px 8px 2px 15px;
}
.aparelho-campos span {
  height: 15px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  user-select: none;
}
.aparelho-campos p {
  font-weight: 600;
  color: #555;
  text-align: left;
  margin-bottom: 7px;
}
.aparelho:hover .bt-detalhe-aparelho {
  display: flex;
}
.bt-detalhe-aparelho:hover {
  font-size: 2rem;
  transition: 0.1s ease;
}
.bt-detalhe-aparelho {
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  right: 5px;
  top: 5px;
  font-size: 1.7rem;
  color: #0009;
  user-select: none;
  cursor: pointer;
}
@media (max-width: 768px) {
  .bt-detalhe-aparelho {
    display: flex;
  }
}
</style>