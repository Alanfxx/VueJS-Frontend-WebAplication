<template>
  <div class="detalhe-cliente">
    <div class="imagem-detalhe-cliente" v-if="ctrlCliente.itemAtual.nome">
      <img :src="require(`@/assets/clientes/cliente.png`)" alt="Imagem do cliente"/>
    </div>
    <div class="content-detalhe-cliente">
      <Campos />
      <div class="opcoes-detalhe-cliente" v-show="!ctrlGlobal.processing">
        <a href='#' class='ml-5' @click="confirmExclusao">Excluir</a>
        <b-button variant='warning' class='mr-5 px-3' size="sm"
          @click="ctrlCliente.editar=true">Editar</b-button>
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
.opcoes-detalhe-cliente > a:hover {
  text-decoration: none;
  background: orangered;
  color: #fff;
}
.opcoes-detalhe-cliente > a{
  margin-left: 20px;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 9px 15px;
  border-radius: 4px;
  user-select: none;
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