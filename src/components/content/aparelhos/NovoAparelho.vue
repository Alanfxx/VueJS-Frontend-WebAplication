<template>
  <div class="novo-aparelho-background">
    <div class="novo-aparelho">
      <div class="novo-aparelho-titulo">Novo Aparelho</div>
      <div class="campo-novo-aparelho">
        <div>Tipo</div>
        <div>
          <select name="Tipo" v-model="tipo">
            <option v-for="tipo in ctrlAparelho.tipos" :key="tipo" :value="tipo">{{tipo}}</option>
          </select>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Modelo</div>
        <div>
          <input name="Modelo" type="text" v-model="modelo" />
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Marca</div>
        <div>
          <input name="Marca" type="text" v-model="marca" />
        </div>
      </div>
      <div class="campo-novo-aparelho">
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
      <div class="campo-novo-aparelho">
        <div>Data de Entrada</div>
        <div>
          <input name="Data de Entrada" type="datetime-local" v-model="dte" />
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Estado</div>
        <div>
          <select name="Estado" v-model="estado">
            <option value="Pendente">Pendente</option>
            <option value="Consertado" disabled>Consertado</option>
            <option value="Sem Conserto" disabled>Sem Conserto</option>
          </select>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Descrição</div>
        <div>
          <textarea name="Descrição" rows="4" cols="50" v-model="descricao"></textarea>
        </div>
      </div>
      <div class="bts-novo-aparelho" v-show="!ctrlGlobal.processing">
        <a href="#" @click="reset">Cancelar</a>
        <b-button size="sm" variant="success" class="ml-4 mr-3 px-3" @click="salvarNovo">Salvar</b-button>
      </div>
      <div class="bts-novo-aparelho" v-show="ctrlGlobal.processing">
        <b-spinner class="mr-5" type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "novoAparelho",
  data: function() {
    return {
      ctrlGlobal: this.$store.state.global.ctrlGlobal,
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho,
      tipo: null,
      marca: null,
      modelo: null,
      dono: null,
      dte: null,
      estado: "Pendente",
      descricao: null
    };
  },
  watch: {
    novoWatch() {
      this.dte = this.$store.state.global.formatarParaDataInput(Date.now());
    }
  },
  computed: {
    clientes() {
      return this.$store.getters.clientesList;
    },
    novoWatch() {
      return this.ctrlAparelho.novo;
    }
  },
  methods: {
    reset() {
      this.tipo = null;
      this.marca = null;
      this.modelo = null;
      this.dono = null;
      this.descricao = null;
      this.ctrlAparelho.novo = false;
    },
    async salvarNovo() {
      if (!this.validarCampos()) return;
      let novoAparelho = this.aparelhoFactory();

      const res = await this.$store.dispatch("saveAparelho", novoAparelho);
      if (res.tipo === "sucesso") {
        novoAparelho.id = res.id; //Novo Id
        this.novoAparelhoToast(res.msg, "success");
        await this.$store.dispatch("loadAparelhos");
        this.reset();
        // Adicionar id do aparelho criado à lista de aparelhos do cliente dono
        if (novoAparelho.dono) {
          const resp = await this.$store.dispatch("addAparelhoToList", {apId: novoAparelho, dono: this.dono});
          if(resp.tipo === 'erro') this.novoAparelhoToast(resp.msg, "danger")
          this.$store.dispatch("loadClientes");
        }
      } else {
        this.novoAparelhoToast(res.msg, "danger");
      }
    },
    aparelhoFactory() {
      const novoAparelho = {
        tipo: this.tipo.trim(),
        marca: this.marca.trim(),
        modelo: this.modelo.trim(),
        dono: this.dono.id ? this.dono.id : null,
        dte: Date.parse(this.dte),
        dts: null,
        estado: this.estado,
        descricao: this.descricao ? this.descricao.trim() : null
      };
      return novoAparelho;
    },
    novoAparelhoToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Aparelhos",
        variant: variant,
        solid: true
      });
    },
    validarCampos() {
      if (!this.tipo) {
        this.novoAparelhoToast("Tipo não informado", "danger");
        return false;
      }
      if (!this.modelo) {
        this.novoAparelhoToast("Modelo não informado", "danger");
        return false;
      }
      if (!this.marca) {
        this.novoAparelhoToast("Marca não informada", "danger");
        return false;
      }
      if (!this.dono) {
        this.novoAparelhoToast("Dono não informada", "danger");
        return false;
      }
      if (!this.dte) {
        this.novoAparelhoToast("Data não informada", "danger");
        return false;
      }
      return true
    }
  }
};
</script>

<style>
.novo-aparelho-background {
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
.novo-aparelho {
  min-width: 290px;
  min-height: 500px;
  background: rgb(237, 242, 247);
  border-radius: 5px;
  box-shadow: 0 0 20px #0004;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.novo-aparelho-titulo {
  text-align: left;
  padding: 20px;
  font-weight: 600;
  color: darkgreen;
}
.campo-novo-aparelho {
  display: grid;
  min-height: 40px;
  grid-template-columns: 180px 1fr;
  padding: 5px 10px;
  color: #444;
}
.campo-novo-aparelho div:nth-child(1) {
  display: flex;
  justify-content: flex-end;
  padding: 8px 5px 0;
}
.campo-novo-aparelho div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #0002; */
  padding: 0 5px;
}
.campo-novo-aparelho input,
.campo-novo-aparelho select,
.campo-novo-aparelho textarea {
  padding: 3px 5px;
}
.bts-novo-aparelho {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}
</style>