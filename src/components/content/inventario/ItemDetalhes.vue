<template>
    <div class="item-detalhes" v-show="mostrarDetalhes">
        <div id="imagem-item-detalhes">
            <b-icon variant='info' style="width: 90px; height: 90px" icon="file-earmark-text" v-show="!editing"></b-icon>
        </div>
        <div class="conteudo-item-detalhes">
            <div class="titulos-item-detalhes">
                <span>Nome:</span>
                <span v-if="item.ref !== undefined">Referência:</span>
                <span>Quantidade:</span>
            </div>
            <div class="campos-item-detalhes" v-show="!editing">
                <span>{{item.name}}</span>
                <span v-if="item.ref !== undefined">{{item.ref}}</span>
                <span>{{item.quant}}</span>
            </div>
            <div class="inputs-item-detalhes" v-show="editing">
                <input type="text" v-model="item.name" />
                <input type="text" v-model="item.ref" v-if="item.ref !== undefined"/>
                <input type="number" v-model="item.quant" />
            </div>
        </div>
        <div class="botoes-item-detalhes">
            <div class="botoes-edicao" v-show='editing'>
                <b-button size='sm' variant="warning" @click="confirmEdicao">Aplicar</b-button>
                <b-button size='sm' class="mt-2" @click="cancelarEdicao">Cancelar</b-button>
            </div>
            <div class="prossesando" v-show="processing.status">
                <b-spinner type="grow" variant='info'></b-spinner>
            </div>
            <div class="botoes-detalhes" v-show='!editing && !processing.status'>
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
                    class="ml-3 mt-4"
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
    props: ["item", 'mostrarDetalhes'],
    data: function() {
        return {
            editing: false,
            itemEditing: null,
            processing: this.$store.state.global.processing
        };
    },
    beforeUpdate() {
        if(!this.mostrarDetalhes) {
            this.cancelarEdicao()
        }
    },
    methods: {
        startEdit() {
            this.itemEditing = { ...this.item };
            this.editing = true;
        },
        cancelarEdicao() {
            if(this.itemEditing){
                Object.keys(this.itemEditing).forEach(key => {
                    this.item[key] = this.itemEditing[key];
                });
            }
            this.itemEditing = null;
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
    align-items: center;
    padding: 10px 0;
}
#imagem-item-detalhes {
    height: 100%;
    display: flex;
    align-items: center;
}
.conteudo-item-detalhes {
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
}
.titulos-item-detalhes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #555;
    user-select: none;
}
.titulos-item-detalhes span {
    display: flex;
    align-items: center;
    height: 40px;
}
.campos-item-detalhes {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 1.3rem;
}
.campos-item-detalhes span {
    display: flex;
    align-items: center;
    height: 37px;
}
.botoes-item-detalhes {
    height: 100%;
    display: flex;
}
.botoes-detalhes {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
/* ========Editando========= */
.inputs-item-detalhes {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}
.inputs-item-detalhes input{
    width: 180px;
    border-radius: 5px;
    border: none;
    padding: 4px 8px;
    margin-bottom: 5px;
    background-color: #ddd;
}
.botoes-edicao {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 15px;
    margin-bottom: 4px;
}
.prossesando {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>