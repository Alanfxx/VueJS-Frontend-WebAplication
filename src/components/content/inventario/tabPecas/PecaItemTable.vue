<template>
    <div class="peca-item-table" @click="$emit('clicou')" :class="{'peca-color': index%2==0}">
        <div class="name">{{peca.name}}</div>
        <div class="quant">{{peca.quant}}</div>
    </div>
</template>

<script>
export default {
    name: "PecaItemTable",
    props: [ 'peca', 'index' ]
}
</script>

<style>
.peca-item-table {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    border-top: 1px solid #ddd;
    border-radius: 3px;
    /* border-collapse: collapse; */
}
.peca-color {
    background-color: #f1f1f1;
}
.peca-item-table:hover {
    background-color: rgb(238, 255, 238);
}
.peca-item-table div {
    width: 100%;
    /* border-right: 1px solid #eee; */
}
</style>