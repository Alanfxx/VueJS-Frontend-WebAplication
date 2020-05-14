<template>
    <div class="item-detalhes">
        <b-icon style="width: 80px; height: 80px;" icon="file-earmark-text"></b-icon>
        <div class="campos">
            <div v-for="(campo, i) in item" :key="i">{{i}}: {{campo}}</div>
        </div>
        <div class="bts">
            <b-icon variant="warning" icon="pencil-square" class="editar-icon"></b-icon>
            <b-icon variant="danger" icon="trash" class="lixeira-icon" @click="showMsgBoxOne"></b-icon>
            <!-- @click="$emit('editar')" -->
        </div>
    </div>
</template>

<script>
export default {
    name: "ItemDetalhes",
    props: ["item"],
    methods: {
        showMsgBoxOne() {
            this.$bvModal.msgBoxConfirm(
                "Confirma a exclusão?", {
                    // title: 'Please Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'SIM',
                    cancelTitle: 'NÃO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }).then(value => {
                    if(value) this.$emit('remove')
                })
        }
    }
}
</script>

<style>
.item-detalhes {
    width: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    /* border: 1px solid #ddd;
    border-radius: 4px; */
}
.campos {
    text-align: left;
    border-left: 2px solid #444;
    border-right: 2px solid #444;
    border-radius: 6px;
    margin: 6px 0px;
    padding: 10px 30px;
}
.bts {
    margin-top: 10px;
    padding: 10px 20px;
    text-align: right;
}
.editar-icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
}
.lixeira-icon {
    margin-left: 20px;
    width: 25px;
    height: 25px;
    cursor: pointer;
}
</style>