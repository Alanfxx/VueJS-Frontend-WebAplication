<template>
    <div class="formulario-novo" v-show="novoButton.status">
        <b-form-group class='form-group-formulario-novo' label="Nome:" label-align="left" label-size="sm">
            <b-form-input type="text" v-model="peca.name" required placeholder="Informe o nome.." />
        </b-form-group>
        <b-form-group class='form-group-formulario-novo' label="Referencia:" label-align="left" label-size="sm" v-if="tabAtual === 'pecas'">
            <b-form-input
                type="text"
                v-model="peca.ref"
                required
                placeholder="Informe a referência.."
            />
        </b-form-group>
        <b-form-group class='form-group-formulario-novo' label="Quantidade:" label-align="left" label-size="sm">
            <b-form-input
                type="number"
                v-model="peca.quant"
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
    props: ["tabAtual"],
    data: function() {
        return {
            novoButton: this.$store.state.global.novoButton,
            processing: this.$store.state.global.processing,
            peca: {}
        };
    },
    watch: {
        novoButton: {
            deep: true,
            handler: function() {
                if (this.novoButton.status) {
                    this.peca = {};
                }
            }
        }
    },
    methods: {
        cancelar() {
            this.peca = {};
            this.novoButton.status = false;
        },
        salvar() {
            this.$emit("salvar", {
                data: this.peca,
                cb: () => {
                    this.peca = {};
                    this.novoButton.status = false;
                }
            });
        }
    },
    mounted() {
        this.peca = {};
        this.novoButton.status = false;
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

@media(max-width: 768px) {
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