<template>
<div>
    <div class="item-vazio" v-show="item.name === undefined">
        <b-icon id='empty-icon-detalhes' style="" icon="file-earmark-text"></b-icon>
    </div>
    <div class="item-detalhes" v-show="item.name !== undefined">
        <b-icon style="width: 80px; height: 80px;" icon="file-earmark-text"></b-icon>
        <div class="campos">
            <div>
                <span class="label">
                    <strong>Nome:</strong>
                </span>
                <span class="valorDetalhe" v-show="!editing">{{item.name}}</span>
                <input type="text" v-show="editing" v-model="item.name">
            </div>
            <div v-show="item.ref !== undefined">
                <span class="label">
                    <strong>Referência:</strong>
                </span>
                <span class="valorDetalhe" v-show="!editing">{{item.ref}}</span>
                <input type="text" v-show="editing" v-model="item.ref">
            </div>
            <div>
                <span class="label">
                    <strong>Quantidade:</strong>
                </span>
                <span class="valorDetalhe" v-show="!editing">{{item.quant}}</span>
                <input type="number" v-show="editing" v-model="item.quant">
            </div>
        </div>
        <div class="bts-mode-editar" v-show="editing" style="align-self: flex-end;">
            <b-button variant="warning"  class="m-2 mr-4" @click="confirmEdicao">Aplicar</b-button>
            <b-button class="m-2 mr-4" @click="cancelarEdicao">Cancelar</b-button>
        </div>
        <div class="bts" v-show='!editing'>
            <div class="bt-item" @click="startEdit">
                <b-icon variant="warning" icon="pencil-square" class="editar-icon"></b-icon>
            </div>
            <div class="bt-item" @click="confirmExclusao">
                <b-icon variant="danger" icon="trash" class="lixeira-icon"></b-icon>
            </div>
            <!-- @click="$emit('editar')" -->
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
            itemEditing: { }
        }
    },
    methods: {
        startEdit() {
            this.itemEditing = { ...this.item }
            this.editing = true
        },
        cancelarEdicao() {
            Object.keys(this.itemEditing).forEach(key => {
                this.item[key] = this.itemEditing[key]
            })
            this.itemEditing = {}
            this.editing = false
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
                }).then(value => {
                    this.editing = false
                    if(value) {
                        this.$emit("editar")
                    } else {
                        Object.keys(this.itemEditing).forEach(key => {
                            this.item[key] = this.itemEditing[key]
                        })
                        this.itemEditing = {}
                    }
                })
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
                }).then(value => {
                    if(value) {
                        this.$emit("remove")
                    } 
                })
        }
    }
}
</script>

<style>
.item-vazio {
    height: 100%;
    display: flex;
    align-items: center;
}
#empty-icon-detalhes {
    width: 100px; 
    height: 100px;
    transition: .2s ease;
}
#empty-icon-detalhes:hover {
    width: 150px; 
    height: 150px;
    transition: .2s ease;
}
.item-detalhes {
    background-color: rgb(230, 244, 255);
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 5px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 0 10px;
}
.campos {
    width: 98%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(242, 250, 255);
    border-radius: 3px;
    margin: 6px 0px;
    padding: 15px 5px;
}
.campos .label {
    color: #888;
    user-select: none;
    font-size: .9rem;
}
.campos .valorDetalhe {
    font-size: 1.3rem;
}
.campos div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-radius: 3px;
}
.campos input {
    width: 150px;
    border: none;
    border-bottom: 1px solid #bbb;
    text-align: center;
    background-color: #fff2;
    outline: none;
}
.bts {
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 10px 0;
    align-self: flex-end;
}
.bt-item{
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 8px 12px; */
    width: 50px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
}
.bt-item:hover {
    background-color: rgb(255, 255, 255, .4);
    border: 1px solid #ddd;
    box-shadow: 0px 1px #0001;
}
.editar-icon {
    width: 25px;
    height: 25px;
}
.lixeira-icon {
    width: 25px;
    height: 25px;
}
</style>