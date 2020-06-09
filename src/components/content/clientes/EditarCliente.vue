<template>
  <div class="editar-cliente-background">
    <div class="editar-cliente">
      <div class="editar-cliente-titulo">editar cliente</div>
      
      <div class="campo-editar-cliente">
        <div>Nome</div>
        <div>
          <input name="Nome" type="text" v-model="nome"/>
        </div>
      </div>
      <div class="campo-editar-cliente">
        <div>Apelido</div>
        <div>
          <input name="Apelido" type="text" v-model="apelido"/>
        </div>
      </div>
      
      <div class="campo-editar-cliente">
        <div>Cidade</div>
        <div>
          <input name="Cidade" type="text" v-model="cidade"/>
        </div>
      </div>
      <div class="campo-editar-cliente">
        <div>Telefone</div>
        <div>
          <input name="Telefone" type="text" v-model="tels"/>
        </div>
      </div>
      
      <div class="bts-editar-cliente" v-show="!ctrlGlobal.processing">
        <a href="#" @click="cancelar">Cancelar</a>
        <b-button size="sm" variant="warning" class="ml-4 mr-3 px-3"
          @click="salvareditar">Salvar alterações</b-button>
      </div>
      <div class="bts-editar-cliente" v-show="ctrlGlobal.processing">
        <b-spinner class='mr-5' type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editarCliente',
  data: function() {
    return {
      ctrlGlobal: this.$store.state.global.ctrlGlobal,
      ctrlCliente: this.$store.state.clientes.ctrlCliente,
      nome: null,
      apelido: null,
      cidade: null,
      tels: null,
    }
  },
  watch: {
    editarWatch() {
      if (this.editarWatch) this.iniciarVariaveis();
    }
  },
  computed: {
    editarWatch() {
      return this.ctrlCliente.editar;
    },
  },
  methods: {
    editarClienteToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Clientes",
        variant: variant,
        solid: true
      });
    },
    async salvareditar() {
      if(!this.nome) return this.editarClienteToast('Nome não informado', 'danger')
      if(!this.tels) return this.editarClienteToast('Telefone não informado', 'danger')
      const editarCliente = this.clienteFactory()
      const res = await this.$store.dispatch("saveCliente", editarCliente);
      if (res.tipo === "sucesso") {
        this.editarClienteToast(res.msg, "success");
        this.$store.dispatch("loadClientes");
        this.ctrlCliente.itemAtual = { ...editarCliente }
        this.cancelar()
      } else {
        this.editarClienteToast(res.msg, "danger");
      }
    },
    cancelar() {
      this.ctrlCliente.editar = false
    },
    iniciarVariaveis() {
      this.nome = this.ctrlCliente.itemAtual.nome
      this.apelido = this.ctrlCliente.itemAtual.apelido
      this.cidade = this.ctrlCliente.itemAtual.cidade
      this.tels = this.ctrlCliente.itemAtual.tels
    },
    clienteFactory() {
      const editarCliente = {
        id: this.ctrlCliente.itemAtual.id,
        nome: this.nome.trim(),
        tels: this.tels.trim(),
        apelido: this.apelido ? this.apelido.trim() : null,
        cidade: this.cidade ? this.cidade.trim() : null,
        aparelhos: this.ctrlCliente.itemAtual.aparelhos
      }
      return editarCliente
    }
  }
};
</script>

<style>
.editar-cliente-background {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #0008;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}
.editar-cliente {
  min-width: 290px;
  min-height: 300px;
  background: rgb(237, 242, 247);
  border-radius: 5px;
  box-shadow: 0 0 20px #0004;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.editar-cliente-titulo {
  text-align: left;
  padding: 20px;
  font-weight: 600;
  color: orange;
}
.campo-editar-cliente {
  display: grid;
  min-height: 40px;
  grid-template-columns: 180px 1fr;
  padding: 5px 10px;
  color: #444;
}
.campo-editar-cliente div:nth-child(1) {
  display: flex;
  justify-content: flex-end;
  padding: 8px 5px 0;
}
.campo-editar-cliente div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #0002; */
  padding: 0 5px;
}
.campo-editar-cliente input,
.campo-editar-cliente select,
.campo-editar-cliente textarea {
  padding: 3px 5px;
}
.bts-editar-cliente {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}
</style>