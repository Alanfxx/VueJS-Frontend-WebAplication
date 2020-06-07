<template>
  <div class="cliente">
    <div class="img-cliente">
      <img src="@/assets/clientes/cliente.png" alt="Imagem cliente">
    </div>
    <div class="content-cliente">
      <span>Nome</span>
      <p>{{cliente.nome}}</p>
      <span class="bt-detalhe-cliente" @click="detalhe">
        <b-icon icon="aspect-ratio" class="mb-0 mt-0"></b-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cliente',
  props: ['cliente'],
  data: function() {
    return {
      ctrlCliente: this.$store.state.clientes.ctrlCliente
    }
  },
  methods: {
    detalhe() {
      this.ctrlCliente.tab = 'detalhe'
      this.ctrlCliente.itemAtual = { ...this.cliente }
    }
  }
}
</script>

<style>
.cliente:hover {
  border: 2px solid limegreen;
}
.cliente {
  width: 290px;
  height: 100px;
  background: rgb(237,242,247);
  border: 2px solid transparent;
  border-radius: 5px;
  margin: 10px;
  display: grid;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "img content";
  box-shadow: 2px 2px 2px #0002;
  transition: 400ms ease;
}
.img-cliente {
  grid-area: img;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  user-select: none;
  padding: 3px;
}
.img-cliente img {
  position: relative;
  max-height: 100%;
  border-radius: 4px;
}
.content-cliente {
  position: relative;
  grid-area: content;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  text-align: left;
}
.content-cliente span {
  color: #777;
  font-weight: 600;
}
.content-cliente p {
  margin: 0;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
}
.cliente:hover .bt-detalhe-cliente {
  display: flex;
}
.bt-detalhe-cliente:hover {
  font-size: 2rem;
  transition: 0.1s ease;
}
.bt-detalhe-cliente {
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  right: 5px;
  top: 5px;
  font-size: 1.6rem;
  color: #0009;
  user-select: none;
  cursor: pointer;
}
@media (max-width: 768px) {
  .bt-detalhe-cliente {
    display: flex;
  }
}
</style>