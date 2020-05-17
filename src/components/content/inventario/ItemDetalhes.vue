<template>
    <div class="item-detalhes" v-show="item.name !== undefined">
        <div id="imagem-item-detalhes">
            <b-icon variant='info' style="width: 60px; height: 60px" icon="file-earmark-text" v-show="!editing"></b-icon>
        </div>
        <div class="conteudo-item-detalhes">
            <div class="titulos-item-detalhes">
                <span>Nome:</span>
                <span v-show="item.ref !== undefined">Referência:</span>
                <span>Quantidade:</span>
            </div>
            <div class="campos-item-detalhes" v-show="!editing">
                <span class="valorDetalhe">{{item.name}}</span>
                <span class="valorDetalhe" v-if="item.ref !== undefined">{{item.ref}}</span>
                <span class="valorDetalhe">{{item.quant}}</span>
            </div>
            <div class="inputs-item-detalhes" v-show="editing">
                <input type="text" v-model="item.name" />
                <input type="text" v-model="item.ref" v-if="item.ref !== undefined"/>
                <input type="number" v-model="item.quant" />
            </div>
        </div>
        <div class="botoes-item-detalhes">
            <div class="botoes-edicao" v-show='editing'>
                <b-button variant="warning" class="m-2 mr-4" @click="confirmEdicao">Aplicar</b-button>
                <b-button class="m-2 mr-4" @click="cancelarEdicao">Cancelar</b-button>
            </div>
            <div class="botoes-detalhes" v-show='!editing'>
                <b-icon
                    variant="warning"
                    icon="pencil-square"
                    class="ml-3"
                    style="width: 25px; height: 25px; cursor: pointer;"
                    @click="startEdit"
                ></b-icon>
                <b-icon
                    variant="danger"
                    icon="trash"
                    class="ml-3"
                    style="width: 25px; height: 25px; cursor: pointer;"
                    @click="confirmExclusao"
                ></b-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ItemDetalhes",
    props: ["item"],
    data: function() {
        return {
            editing: false,
            itemEditing: {}
        };
    },
    methods: {
        startEdit() {
            this.itemEditing = { ...this.item };
            this.editing = true;
        },
        cancelarEdicao() {
            Object.keys(this.itemEditing).forEach(key => {
                this.item[key] = this.itemEditing[key];
            });
            this.itemEditing = {};
            this.editing = false;
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
                    this.editing = false;
                    if (value) {
                        this.$emit("editar");
                    } else {
                        Object.keys(this.itemEditing).forEach(key => {
                            this.item[key] = this.itemEditing[key];
                        });
                        this.itemEditing = {};
                    }
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
    justify-content: center;
    padding: 10px 0;
}
#imagem-item-detalhes {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.conteudo-item-detalhes {
    width: 250px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin: 0 30px;
}
.titulos-item-detalhes {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    color: #555;
    user-select: none;
}
.campos-item-detalhes {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    font-size: 1.3rem;
}
.botoes-detalhes {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
/* ========Editando========= */
.inputs-item-detalhes {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 10px;
}
.inputs-item-detalhes input{
    width: 180px;
    border-radius: 5px;
    border: none;
    padding: 4px 8px;
    background-color: #ddd;
}
.botoes-edicao {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
}
</style>