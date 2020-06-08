<template>
  <div class="editar-aparelho-background">
    <div class="editar-aparelho">
      <div class="editar-aparelho-titulo">Editar Aparelho</div>
      <div class="campo-editar-aparelho">
        <div>Tipo</div>
        <div>
          <select name="Tipo" v-model="tipo">
            <option v-for="tipo in ctrlAparelho.tipos" :key="tipo" :value="tipo">{{tipo}}</option>
          </select>
        </div>
      </div>
      <div class="campo-editar-aparelho">
        <div>Modelo</div>
        <div>
          <input name="Modelo" type="text" v-model="modelo" />
        </div>
      </div>
      <div class="campo-editar-aparelho">
        <div>Marca</div>
        <div>
          <input name="Marca" type="text" v-model="marca" />
        </div>
      </div>
      <div class="campo-editar-aparelho">
        <div>Dono</div>
        <div>
          <select name="Dono" v-model="dono">
            <option :value="{}">Não cadastrado</option>
            <option
              v-for="cliente in clientes"
              :key="cliente.nome"
              :value="cliente"
            >{{cliente.nome}}</option>
          </select>
        </div>
      </div>
      <div class="campo-editar-aparelho">
        <div>Data de Entrada</div>
        <div>
          <input name="Data de Entrada" type="datetime-local" v-model="dte" />
        </div>
      </div>
      <div class="campo-editar-aparelho" v-show="dts">
        <div>Data de Saída</div>
        <div>
          <input name="Data de Saida" type="datetime-local" v-model="dts" />
        </div>
      </div>
      <div class="campo-editar-aparelho">
        <div>Descrição</div>
        <div>
          <textarea name="Descrição" rows="4" cols="50" v-model="descricao"></textarea>
        </div>
      </div>
      <div class="bts-editar-aparelho" v-show="!ctrlGlobal.processing">
        <a href="#" @click="cancelar">Cancelar</a>
        <b-button
          size="sm"
          variant="warning"
          class="ml-4 mr-3 px-3"
          @click="salvarEdicao"
        >Salvar mudanças</b-button>
      </div>
      <div class="bts-editar-aparelho" v-show="ctrlGlobal.processing">
        <b-spinner class="mr-5" type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editarAparelho",
  data: function() {
    return {
      ctrlGlobal: this.$store.state.global.ctrlGlobal,
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho,
      id: null,
      tipo: null,
      marca: null,
      modelo: null,
      dono: null,
      dte: null,
      dts: null,
      estado: null,
      descricao: null
    };
  },
  watch: {
    editarWatch() {
      if (this.editarWatch) this.iniciarVariaveis();
    }
  },
  computed: {
    editarWatch() {
      return this.ctrlAparelho.editar;
    },
    clientes() {
      return this.$store.getters.clientesList;
    },
    donoItemAtual() {
      if (this.ctrlAparelho.itemAtual.dono) {
        const dono = this.$store.getters.getClienteById(this.ctrlAparelho.itemAtual.dono)
        return dono ? dono : {};
      } else {
        return {};
      }
    }
  },
  methods: {
    editarAparelhoToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Aparelhos",
        variant: variant,
        solid: true
      });
    },
    async salvarEdicao() {
      if(!this.validarCampos()) return
      const aparelhoEditado = this.aparelhoEditadoFactory()
      const res = await this.$store.dispatch("saveAparelho", aparelhoEditado);
      if (res.tipo === "sucesso") {
        this.editarAparelhoToast(res.msg, "success");
        if(this.dono.id !== this.ctrlAparelho.itemAtual.dono) {
          //Remove id do aparelho do dono antigo
          await this.$store.dispatch('delAparelhoFromList', this.ctrlAparelho.itemAtual)
          //Add id do aparelho no novo dono
          await this.$store.dispatch('addAparelhoToList', {apId: aparelhoEditado.id, dono: this.dono})
          this.$store.dispatch("loadClientes");
        }
        this.ctrlAparelho.itemAtual = { ...aparelhoEditado };
        this.$store.dispatch("loadAparelhos");
        this.cancelar();
      } else {
        this.editarAparelhoToast(res.msg, "danger");
      }
    },
    cancelar() {
      this.ctrlAparelho.editar = false;
      this.iniciarVariaveis();
    },
    iniciarVariaveis() {
      this.id = this.ctrlAparelho.itemAtual.id;
      this.tipo = this.ctrlAparelho.itemAtual.tipo;
      this.marca = this.ctrlAparelho.itemAtual.marca;
      this.modelo = this.ctrlAparelho.itemAtual.modelo;
      this.dono = this.donoItemAtual;
      this.dte = this.$store.state.global.formatarParaDataInput(
        this.ctrlAparelho.itemAtual.dte
      );
      if (this.ctrlAparelho.itemAtual.dts)
        this.dts = this.$store.state.global.formatarParaDataInput(
          this.ctrlAparelho.itemAtual.dts
        );
      this.estado = this.ctrlAparelho.itemAtual.estado;
      this.descricao = this.ctrlAparelho.itemAtual.descricao;
    },
    aparelhoEditadoFactory() {
      const aparelhoEditado = {
        id: this.id,
        tipo: this.tipo.trim(),
        marca: this.marca.trim(),
        modelo: this.modelo.trim(),
        dono: this.dono.id ? this.dono.id : null,
        dte: Date.parse(this.dte),
        dts: this.dts ? Date.parse(this.dts) : null,
        estado: this.estado,
        descricao: this.descricao ? this.descricao.trim() : null
      };
      return aparelhoEditado
    },
    validarCampos() {
      if (!this.tipo) {
        this.editarAparelhoToast("Tipo não informado", "danger");
        return false;
      }
      if (!this.modelo) {
        this.editarAparelhoToast("Modelo não informado", "danger");
        return false;
      }
      if (!this.marca) {
        this.editarAparelhoToast("Marca não informada", "danger");
        return false;
      }
      if (!this.dono) {
        this.editarAparelhoToast("Dono não informada", "danger");
        return false;
      }
      if (!this.dte) {
        this.editarAparelhoToast("Data não informada", "danger");
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
.editar-aparelho-background {
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
.editar-aparelho {
  min-width: 290px;
  min-height: 500px;
  background: rgb(237, 242, 247);
  border-radius: 5px;
  box-shadow: 0 0 20px #0004;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.editar-aparelho-titulo {
  text-align: left;
  padding: 20px;
  font-weight: 600;
  color: orange;
}
.campo-editar-aparelho {
  display: grid;
  min-height: 40px;
  grid-template-columns: 180px 1fr;
  padding: 5px 10px;
  color: #444;
}
.campo-editar-aparelho div:nth-child(1) {
  display: flex;
  justify-content: flex-end;
  padding: 8px 5px 0;
}
.campo-editar-aparelho div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #0002; */
  padding: 0 5px;
}
.campo-editar-aparelho input,
.campo-editar-aparelho select,
.campo-editar-aparelho textarea {
  padding: 3px 5px;
}
.bts-editar-aparelho {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}
</style>