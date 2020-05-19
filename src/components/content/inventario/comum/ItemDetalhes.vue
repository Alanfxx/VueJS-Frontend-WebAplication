<template>
    <div class="item-detalhes" v-show="mostrarDetalhes">
        <div class="imagem-item-detalhes">
            <b-icon variant='info' style="width: 60px; height: 60px;" icon="image"></b-icon>
        </div>
        <div class="conteudo-item-detalhes">
            <div class="campos-item-detalhes">
                <div>
                    <span class='chaves-item-detalhes'>Nome:</span>
                    <span v-show="!editing.status">{{item.name}}</span>
                    <input class='input-item-detalhes' type="text" v-model="itemEditing.name" v-show="editing.status"/>
                </div>
                <div v-if="item.ref !== undefined">
                    <span class='chaves-item-detalhes'>Referência:</span>
                    <span v-show="!editing.status">{{item.ref}}</span>
                    <input class='input-item-detalhes' type="text" v-model="itemEditing.ref" v-show="editing.status"/>
                </div>
                <div>
                    <span class='chaves-item-detalhes'>Quantidade:</span>
                    <span v-show="!editing.status">{{item.quant}}</span>
                    <input class='input-item-detalhes' type="number" v-model="itemEditing.quant" v-show="editing.status"/>
                </div>
            </div>
            <div class="botoes-item-detalhes">
                <div v-show='editing.status'>
                    <b-button size='sm' variant="warning" @click="confirmEdicao">Aplicar</b-button>
                    <b-button size='sm' class="ml-3" @click="cancelarEdicao">Cancelar</b-button>
                </div>
                <div v-show="processing.status">
                    <b-spinner type="grow" variant='info'></b-spinner>
                </div>
                <div v-show='!editing.status && !processing.status'>
                    <b-icon
                        variant="warning"
                        icon="pencil-square"
                        style="width: 26px; height: 26px; cursor: pointer;"
                        @click="startEdit"
                    ></b-icon>
                    <b-icon
                        variant="danger"
                        icon="trash"
                        class="ml-5"
                        style="width: 26px; height: 26px; cursor: pointer;"
                        @click="confirmExclusao"
                    ></b-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ItemDetalhes",
    props: ["item", 'mostrarDetalhes', 'editing'],
    data: function() {
        return {
            // editing: false,
            itemEditing: {},
            processing: this.$store.state.global.processing
        };
    },
    methods: {
        startEdit() {
            this.itemEditing = { ...this.item };
            this.editing.status = true;
        },
        cancelarEdicao() {
            // if(this.itemEditing){
            //     Object.keys(this.itemEditing).forEach(key => {
            //         this.item[key] = this.itemEditing[key];
            //     });
            // }
            this.itemEditing = {};
            this.editing.status = false;
        },
        confirmEdicao() {
            this.$bvModal
                .msgBoxConfirm("Confirma a alteração?", {
                    // title: 'Please Confirm',
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "warning",
                    okTitle: "Sim",
                    cancelTitle: "Não",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if (value) {
                        this.$emit("editar", this.itemEditing);
                    } else {
                        Object.keys(this.itemEditing).forEach(key => {
                            this.item[key] = this.itemEditing[key];
                        });
                        this.itemEditing = {};
                    }
                    this.editing.status = false;
                });
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
                        this.$emit("remove");
                    }
                });
        }
    }
};
</script>

<style>
.item-detalhes {
    display: flex;
    flex-wrap: wrap;
}
.imagem-item-detalhes {
   padding: 2px 20px;
   width: 300px;
   display: flex;
   align-items: center;
   justify-content: center;
}
.conteudo-item-detalhes {
    padding: 5px 30px 5px 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
}
.campos-item-detalhes {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
}
.campos-item-detalhes div {
    display: flex;
    padding: 3px 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 6px;
}
.campos-item-detalhes span {
    display: block;
    width: 100%;
    text-align: left;
    padding: 1px 6px;
}
.campos-item-detalhes .chaves-item-detalhes {
    color: #888;
    width: 70%;
}
.input-item-detalhes {
    width: 100%;
    border: 1px dashed #bbb;
    border-radius: 5px;
    padding: 0 5px;
}
.botoes-item-detalhes div {
    height: 35px;
}
@media(max-width: 900px) {
    .imagem-item-detalhes {
        width: 100%;
    }
    .conteudo-item-detalhes {
        padding: 3px;
    }
    .campos-item-detalhes div {
        padding: 3px 5px;
    }
}
</style>