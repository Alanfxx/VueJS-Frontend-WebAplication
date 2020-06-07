<template>
  <div class="novo-cliente-background">
    <div class="novo-cliente">
      <div class="novo-cliente-titulo">Novo cliente</div>
      
      <div class="campo-novo-cliente">
        <div>Nome</div>
        <div>
          <input name="Nome" type="text" v-model="nome"/>
        </div>
      </div>
      <div class="campo-novo-cliente">
        <div>Apelido</div>
        <div>
          <input name="Apelido" type="text" v-model="apelido"/>
        </div>
      </div>
      
      <div class="campo-novo-cliente">
        <div>Cidade</div>
        <div>
          <input name="Cidade" type="text" v-model="cidade"/>
        </div>
      </div>
      <div class="campo-novo-cliente">
        <div>Telefone</div>
        <div>
          <input name="Telefone" type="text" v-model="tels"/>
        </div>
      </div>
      
      <div class="bts-novo-cliente" v-show="!ctrlGlobal.processing">
        <a href="#" @click="cancelar">Cancelar</a>
        <b-button size="sm" variant="success" class="ml-4 mr-3 px-3"
          @click="salvarNovo">Salvar</b-button>
      </div>
      <div class="bts-novo-cliente" v-show="ctrlGlobal.processing">
        <b-spinner class='mr-5' type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'novoCliente',
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
  computed: {
    clientes() {
      return this.$store.getters.clientesList
    }
  },
  methods: {
    novoClienteToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Inventário",
        variant: variant,
        solid: true
      });
    },
    async salvarNovo() {
      if(!this.nome) return this.novoClienteToast('Nome não informado', 'danger')
      if(!this.tels) return this.novoClienteToast('Telefone não informado', 'danger')

      const novoCliente = {
        nome: this.nome.trim(),
        tels: this.tels.trim(),
        apelido: this.apelido ? this.apelido : null,
        cidade: this.cidade ? this.cidade : null,
        aparelhos: []
      }
      const res = await this.$store.dispatch("saveCliente", novoCliente);
      if (res.tipo === "sucesso") {
        this.novoClienteToast(res.msg, "success");
        this.cancelar()
        const res2 = await this.$store.dispatch("loadClientes");
        if (res2.tipo === "erro") {
          return this.novoClienteToast(res2.msg, "danger");
        }
      } else {
        this.novoClienteToast(res.msg, "danger");
      }
    },
    cancelar() {
      this.nome = null
      this.apelido = null
      this.cidade = null
      this.tels = null
      this.aparelhos = null
      this.ctrlCliente.novo = false
    },
  }
};
</script>

<style>
.novo-cliente-background {
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
.novo-cliente {
  min-width: 290px;
  min-height: 300px;
  background: rgb(237, 242, 247);
  border-radius: 5px;
  box-shadow: 0 0 20px #0004;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.novo-cliente-titulo {
  text-align: left;
  padding: 20px;
  font-weight: 600;
  color: darkgreen;
}
.campo-novo-cliente {
  display: grid;
  min-height: 40px;
  grid-template-columns: 180px 1fr;
  padding: 5px 10px;
  color: #444;
}
.campo-novo-cliente div:nth-child(1) {
  display: flex;
  justify-content: flex-end;
  padding: 8px 5px 0;
}
.campo-novo-cliente div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #0002; */
  padding: 0 5px;
}
.campo-novo-cliente input,
.campo-novo-cliente select,
.campo-novo-cliente textarea {
  padding: 3px 5px;
}
.bts-novo-cliente {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}
</style>