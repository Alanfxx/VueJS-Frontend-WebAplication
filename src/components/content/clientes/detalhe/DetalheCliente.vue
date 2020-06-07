<template>
  <div class="detalhe-cliente">
    <div class="imagem-detalhe-cliente" v-if="ctrlCliente.itemAtual.nome">
      <img :src="require(`@/assets/clientes/cliente.png`)" alt="Imagem do cliente"/>
    </div>
    <div class="content-detalhe-cliente">
      <Campos />
      <b-icon icon='x-circle-fill' class="fechar" @click="ctrlCliente.tab='todos'"></b-icon>
      <div class="opcoes-detalhe-cliente" v-show="!ctrlGlobal.processing">
        <a href='#' class='ml-5' @click="confirmExclusao">Excluir</a>
        <b-button variant='warning' class='mr-5 px-3 py-1'>Editar</b-button>
      </div>
      <div class="opcoes-detalhe-cliente" v-show="ctrlGlobal.processing">
        <b-spinner class='mx-5' type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Campos from './Campos'
export default {
  name: "DetalhesCliente",
  components: { Campos },
  data: function() {
    return {
      ctrlGlobal: this.$store.state.global.ctrlGlobal,
      ctrlCliente: this.$store.state.clientes.ctrlCliente
    }
  },
  methods: {
    ClienteToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Clientes",
        variant: variant,
        solid: true
      });
    },
    async removeCliente() {
      const res = await this.$store.dispatch("removeCliente", this.ctrlCliente.itemAtual);
      if (res.tipo === "sucesso") {
        this.ClienteToast(res.msg, "success")
        this.$store.dispatch("loadClientes")
        this.ctrlCliente.tab = 'todos'
      } else {
        this.ClienteToast(res.msg, "danger")
      }
    },
    confirmExclusao() {
      this.$bvModal
        .msgBoxConfirm("Confirma a exclusão?", {
          // title: 'Please Confirm',
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Sim",
          cancelTitle: "Não",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.removeCliente()
          }
        });
    }
  }
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
  max-width: 100%;
  grid-area: imagem;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.imagem-detalhe-cliente img {
  position: relative;
  border-radius: 15px;
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
}
</style>