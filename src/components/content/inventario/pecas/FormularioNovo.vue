<template>
  <div class="formulario-novo" v-show="mostrarFormulario">
    <b-form-group
      class="form-group-formulario-novo"
      label="Nome:"
      label-align="left"
      label-size="sm"
    >
      <b-form-select class="campo-nome-pecas" v-model="item.name" :options="options">
        <!-- <template v-slot:first>
          <b-form-select-option :value="null" disabled>-- Selecione um tipo --</b-form-select-option>
        </template> -->
      </b-form-select>
    </b-form-group>
    <b-form-group
      class="form-group-formulario-novo"
      label="Referencia:"
      label-align="left"
      label-size="sm"
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
    <b-form-group v-show="ctrlGlobal.processing">
      <b-spinner type="grow" variant="info"></b-spinner>
    </b-form-group>
    <b-form-group v-show="!ctrlGlobal.processing" style="min-width:150px;">
      <b-button size="sm" variant="success" @click="salvar">Salvar</b-button>
      <b-button size="sm" class="ml-2" @click="cancelar">Cancelar</b-button>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "FormularioNovo",
  props: ["novo"],
  data: function() {
    return {
      ctrlGlobal: this.$store.state.global.ctrlGlobal,
      item: {},
      options: [
        { value: null, text: 'Selecione um tipo', disabled: true },
        { value: 'Resistor', text: 'Resistor' },
        { value: 'Capacitor', text: 'Capacitor' },
        { value: 'Transistor', text: 'Transistor' },
        { value: 'CI', text: 'CI' },
        { value: 'Diodo', text: 'Diodo'},
        { value: 'LED', text: 'LED'},
        { value: 'Flyback', text: 'Flyback'},
      ]
    }
  },
  watch: {
    novo: {
      deep: true,
      handler: function() {
        if (this.novo.status) {
          this.item = {name: null};
          setTimeout(() => {
            document.querySelector(".campo-nome-pecas").focus()
          }, 100)
        }
      }
    }
  },
  computed: {
    mostrarFormulario() {
      if (this.novo.status) return true
      return false;
    }
  },
  methods: {
    cancelar() {
      this.item = {};
      this.novo.status = false
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