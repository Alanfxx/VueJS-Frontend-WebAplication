<template>
    <div class="peca-item-table" :class="{'peca-color': index%2==0}">
        <div class="header-table-peca" @click="mostrarDetalhes = !mostrarDetalhes">
            <div v-show="!mostrarDetalhes">{{peca.name}}</div>
            <div v-show="!mostrarDetalhes">{{peca.ref}}</div>
            <div v-show="!mostrarDetalhes">{{peca.quant}}</div>
            <b-icon style="width: 40px; height: 40px; color: #777;" icon='chevron-double-up' v-show="mostrarDetalhes"></b-icon>
        </div>
        <ItemDetalhes :item='peca' @editar="$emit('editar')" 
            @remove="$emit('remove')" v-show="mostrarDetalhes"/>
    </div>
</template>

<script>
import ItemDetalhes from '../ItemDetalhes'
export default {
    name: "PecaItemTable",
    props: [ 'peca', 'index' ],
    components: { ItemDetalhes },
    data: function() {
        return {
            mostrarDetalhes: false
        }
    }
}
</script>

<style>
.peca-item-table {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ddd;
    border-radius: 3px;
}
.peca-color {
    background-color: #f1f1f1;
}
.header-table-peca {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    cursor: pointer;
    user-select: none;
}
.header-table-peca div {
    width: 100%;
}
.header-table-peca:hover {
    background-color: rgb(238, 255, 238);
    border-bottom: 1px solid #eee;
}
</style>