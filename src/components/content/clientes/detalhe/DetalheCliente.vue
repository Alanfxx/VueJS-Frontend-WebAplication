<template>
  <div class="detalhe-cliente">
    <div class="imagem-detalhe-cliente" v-if="cliente.name">
      <img :src="require(`@/assets/clientes/cliente.png`)" alt="Imagem do cliente"/>
    </div>
    <div class="content-detalhe-cliente">
      <Campos :cliente='cliente'/>
      <b-icon icon='x-circle-fill' class="fechar" @click="$emit('fechar')"></b-icon>
      <div class="opcoes-detalhe-cliente">
        <a href='#' class='ml-5'>Excluir</a>
        <b-button variant='warning' class='mr-5 px-3 py-1'>Editar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Campos from './Campos'
export default {
  name: "DetalhesCliente",
  components: { Campos },
  props: ["cliente"]
};
</script>

<style>
.detalhe-cliente {
  grid-area: content;
  max-width: 1000px;
  height: max-content;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "imagem content";
  /* background: rgb(237, 255, 237,.5); */
  padding: 10px;
}
.imagem-detalhe-cliente {
  height: 100%;
  grid-area: imagem;
  display: flex;
  overflow: hidden;
  justify-content: center;
  user-select: none;
}
.imagem-detalhe-cliente img {
  position: relative;
  padding: 8px;
  border-radius: 15px;
  min-width: 50px;
  max-width: 100%;
  max-height: 100%;
}
.content-detalhe-cliente {
  grid-area: content;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 10px 10px 10px 20px;
}
.content-detalhe-cliente .fechar:hover {
  color: #000a;
  width: 30px;
  height: 30px;
  transition: .1s ease;
}
.content-detalhe-cliente .fechar {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  user-select: none;
  color: #0006;
}
.opcoes-detalhe-cliente {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid#ddd;
}
@media (max-width: 768px) {
  .detalhe-cliente {
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
    grid-template-areas: "imagem" "content";
    padding: 5px;
  }
  .content-detalhe-cliente {
    padding: 3px;
  }
  .imagem-detalhe-cliente img {
    max-height: 100%;
  }
}
</style>