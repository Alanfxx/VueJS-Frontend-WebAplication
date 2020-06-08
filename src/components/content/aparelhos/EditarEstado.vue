<template>
  <div class="editarestado-aparelho-background">
    <div class="editarestado-aparelho">
      <div class="editarestado-aparelho-titulo">Atualizar Estado</div>
      <div class="campo-editarestado-aparelho">
        <div>Estado</div>
        <div>
          <select name="Estado" v-model="estado">
            <option value="Pendente">Pendente</option>
            <option value="Consertado">Consertado</option>
            <option value="Sem Conserto">Sem Conserto</option>
          </select>
        </div>
      </div>
      <div class="campo-editarestado-aparelho">
        <div>Data de Saída</div>
        <div>
          <input name="Data de Saida" type="datetime-local" v-model="dts" :disabled="estado==='Pendente'"/>
        </div>
      </div>
      <div class="bts-editarestado-aparelho" v-show="!ctrlGlobal.processing">
        <a href="#" @click="cancelar">Cancelar</a>
        <b-button
          size="sm"
          variant="warning"
          class="ml-4 mr-3 px-3"
          @click="salvarEdicao"
        >Salvar alterações</b-button>
      </div>
      <div class="bts-editarestado-aparelho" v-show="ctrlGlobal.processing">
        <b-spinner class="mr-5" type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editarestadoAparelho",
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
    editarEstadoWatch() {
      if (this.editarEstadoWatch) this.iniciarVariaveis();
    }
  },
  computed: {
    editarEstadoWatch() {
      return this.ctrlAparelho.editarEstado;
    },
  },
  methods: {
    editarestadoAparelhoToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Aparelhos",
        variant: variant,
        solid: true
      });
    },
    async salvarEdicao() {
      if(!this.validarCampos()) return
      const aparelhoEditado = this.aparelhoEditadoFactory()
      if(aparelhoEditado.estado === 'Pendente') aparelhoEditado.dts = null
      const res = await this.$store.dispatch("saveAparelho", aparelhoEditado);
      if (res.tipo === "sucesso") {
        this.editarestadoAparelhoToast(res.msg, "success");
        this.ctrlAparelho.itemAtual = { ...aparelhoEditado };
        this.$store.dispatch("loadAparelhos");
        this.cancelar();
      } else {
        this.editarestadoAparelhoToast(res.msg, "danger");
      }
    },
    cancelar() {
      this.ctrlAparelho.editarEstado = false;
      this.iniciarVariaveis();
    },
    iniciarVariaveis() {
      this.id = this.ctrlAparelho.itemAtual.id;
      this.tipo = this.ctrlAparelho.itemAtual.tipo;
      this.marca = this.ctrlAparelho.itemAtual.marca;
      this.modelo = this.ctrlAparelho.itemAtual.modelo;
      this.dono = this.ctrlAparelho.itemAtual.dono;
      this.dte = this.ctrlAparelho.itemAtual.dte
      if(this.ctrlAparelho.itemAtual.dts) {
        this.dts = this.$store.state.global
          .formatarParaDataInput(this.ctrlAparelho.itemAtual.dts);
      } else {
        this.dts = this.$store.state.global
          .formatarParaDataInput(Date.now())
      }
      this.estado = this.ctrlAparelho.itemAtual.estado;
      this.descricao = this.ctrlAparelho.itemAtual.descricao;
    },
    aparelhoEditadoFactory() {
      const aparelhoEditado = {
        id: this.id,
        tipo: this.tipo,
        marca: this.marca,
        modelo: this.modelo,
        dono: this.dono,
        dte: this.dte,
        dts: Date.parse(this.dts),
        estado: this.estado,
        descricao: this.descricao
      };
      return aparelhoEditado
    },
    validarCampos() {
      if (!this.tipo) {
        this.editarestadoAparelhoToast("Tipo não informado", "danger");
        return false;
      }
      if (!this.modelo) {
        this.editarestadoAparelhoToast("Modelo não informado", "danger");
        return false;
      }
      if (!this.marca) {
        this.editarestadoAparelhoToast("Marca não informada", "danger");
        return false;
      }
      if (!this.dono) {
        this.editarestadoAparelhoToast("Dono não informada", "danger");
        return false;
      }
      if (!this.dte) {
        this.editarestadoAparelhoToast("Data não informada", "danger");
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
.editarestado-aparelho-background {
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
.editarestado-aparelho {
  min-width: 290px;
  min-height: 250px;
  background: rgb(237, 242, 247);
  border-radius: 5px;
  box-shadow: 0 0 20px #0004;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.editarestado-aparelho-titulo {
  text-align: left;
  padding: 20px;
  font-weight: 600;
  color: blueviolet;
}
.campo-editarestado-aparelho {
  display: grid;
  min-height: 40px;
  grid-template-columns: 180px 1fr;
  padding: 5px 10px;
  color: #444;
}
.campo-editarestado-aparelho div:nth-child(1) {
  display: flex;
  justify-content: flex-end;
  padding: 8px 5px 0;
}
.campo-editarestado-aparelho div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #0002; */
  padding: 0 5px;
}
.campo-editarestado-aparelho input,
.campo-editarestado-aparelho select,
.campo-editarestado-aparelho textarea {
  padding: 3px 5px;
}
.bts-editarestado-aparelho {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}
</style>