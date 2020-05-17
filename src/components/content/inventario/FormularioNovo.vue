<template>
    <div class="formulario-novo">
        <b-form v-show="novoButton.status">
            <!-- <input id="peca-id" type="hidden" v-model="peca.id" /> -->
            <b-row align-v="end" align-h="center">
                <b-col lg="3" md="4" sm="12">
                    <b-form-group label="Nome:" label-for="peca-name" label-align="left">
                        <b-form-input
                            id="peca-name"
                            type="text"
                            v-model="peca.name"
                            required
                            placeholder="Informe o nome.."
                        />
                    </b-form-group>
                </b-col>
                <b-col lg="3" md="4" sm="12" v-if="tabAtual === 'pecas'">
                    <b-form-group label="Referencia:" label-for="peca-ref" label-align="left">
                        <b-form-input
                            id="peca-ref"
                            type="text"
                            v-model="peca.ref"
                            required
                            placeholder="Informe a referência.."
                        />
                    </b-form-group>
                </b-col>
                <b-col lg="3" md="4" sm="12">
                    <b-form-group label="Quantidade:" label-for="peca-quant" label-align="left">
                        <b-form-input
                            id="peca-quant"
                            type="number"
                            v-model="peca.quant"
                            required
                            placeholder="Informe a quantidade.."
                        />
                    </b-form-group>
                </b-col>
                <b-col lg='2' md="4" sm="12" v-show="processing.status">
                    <b-form-group>
                        <b-spinner type="grow" variant="info"></b-spinner>
                    </b-form-group>
                </b-col>
                <b-col lg='2' md="4" sm="12" v-show="!processing.status">
                    <b-form-group>
                        <b-button size='sm' variant="success" @click="salvar">Salvar</b-button>
                        <b-button size='sm' @click="cancelar" class="ml-2">Cancelar</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'FormularioNovo',
    props: ['tabAtual'],
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
                if(this.novoButton.status) {
                    this.peca = {}
                }
            }
        }
    },
    methods: {
        cancelar() {
            this.peca = {}
            this.novoButton.status = false
        },
        salvar() {
            this.$emit('salvar', {
                data: this.peca,
                cb: () => {
                    this.peca = {}
                    this.novoButton.status = false
                }
            })
        }
    },
    mounted() {
        this.peca = {}
        this.novoButton.status = false
    }
};
</script>

<style>
/* .formulario-novo {
    width: 100%;
} */
</style>