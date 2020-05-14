<template>
    <div class="ferramenta-item-table" @click="$emit('clicou')" :class="{'ferramenta-color': index%2==0}">
        <div class="name">{{ferramenta.name}}</div>
        <!-- <div class="quant">{{ferramenta.quant}}</div> -->
    </div>
</template>

<script>
export default {
    name: "FerramentaItemTable",
    props: [ 'ferramenta', 'index' ]
}
</script>

<style>
.ferramenta-item-table {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    border-top: 1px solid #ddd;
    border-radius: 3px;
    /* border-collapse: collapse; */
}
.ferramenta-color {
    background-color: #f1f1f1;
}
.ferramenta-item-table:hover {
    background-color: rgb(238, 255, 238);
}
.ferramenta-item-table div {
    width: 100%;
    /* border-right: 1px solid #eee; */
}
</style>