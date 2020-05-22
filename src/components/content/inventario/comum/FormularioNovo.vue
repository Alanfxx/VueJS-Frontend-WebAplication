<template>
  <div class="formulario-novo" v-show="mostrarFormulario">
    <b-form-group
      class="form-group-formulario-novo"
      label="Nome:"
      label-align="left"
      label-size="sm"
    >
      <b-form-input type="text" v-model="item.name" required placeholder="Informe o nome.." />
    </b-form-group>
    <b-form-group
      class="form-group-formulario-novo"
      label="Referencia:"
      label-align="left"
      label-size="sm"
      v-if="tabAtual === 'pecas'"
    >
      <b-form-input type="text" v-model="item.ref" required placeholder="Informe a referência.." />
    </b-form-group>
    <b-form-group
      class="form-group-formulario-novo"
      label="Quantidade:"
      label-align="left"
      label-size="sm"
    >
      <b-form-input
        type="number"
        v-model="item.quant"
        required
        placeholder="Informe a quantidade.."
      />
    </b-form-group>
    <b-form-group v-show="processing.status">
      <b-spinner type="grow" variant="info"></b-spinner>
    </b-form-group>
    <b-form-group v-show="!processing.status">
      <b-button size="sm" variant="success" @click="salvar">Salvar</b-button>
      <b-button size="sm" class="ml-2" @click="cancelar">Cancelar</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "FormularioNovo",
  props: ["tabAtual", "novo"],
  data: function() {
    return {
      processing: this.$store.state.global.processing,
      item: {}
    };
  },
  watch: {
    novo: {
      deep: true,
      handler: function() {
        if (this.novo.pecas || this.novo.ferramentas) {
          this.item = {};
        }
      }
    }
  },
  computed: {
    mostrarFormulario() {
      if (this.tabAtual === "pecas" && this.novo.pecas) return true;
      else if (this.tabAtual === "ferramentas" && this.novo.ferramentas) return true;
      else return false;
    }
  },
  methods: {
    cancelar() {
      this.item = {};
      if (this.tabAtual === "pecas" && this.novo.pecas) this.novo.pecas = false;
      if (this.tabAtual === "ferramentas" && this.novo.ferramentas) this.novo.ferramentas = false;
    },
    salvar() {
      this.$emit("salvar", this.item)
    }
  },
  mounted() {
    this.cancelar();
  }
};
</script>

<style>
.formulario-novo {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.form-group-formulario-novo {
  margin-right: 25px;
}

@media (max-width: 768px) {
  .formulario-novo {
    flex-direction: column;
    align-items: unset;
  }
  .form-group-formulario-novo {
    margin-right: 0;
    margin-bottom: 8px;
  }
}
</style>