<template>
    <div class="ferramenta-item-table" :class="{'ferramenta-color': index%2==0}">
        <div class="header-table-ferramenta" @click="mostrarDetalhes = !mostrarDetalhes">
            <div class="name" v-show="!mostrarDetalhes">{{ferramenta.name}}</div>
            <div class="name" v-show="!mostrarDetalhes">{{ferramenta.quant}}</div>
            <b-icon style="width: 40px; height: 40px; color: #777;" icon='chevron-double-up' v-show="mostrarDetalhes"></b-icon>
        </div>
        <ItemDetalhes :item='ferramenta' @editar="$emit('editar')" 
                @remove="$emit('remove')" :mostrarDetalhes="mostrarDetalhes"/>
    </div>
</template>

<script>
import ItemDetalhes from '../ItemDetalhes'
export default {
    name: "FerramentaItemTable",
    props: [ 'ferramenta', 'index' ],
    components: { ItemDetalhes },
    data: function() {
        return {
            mostrarDetalhes: false
        }
    }
}
</script>

<style>
.ferramenta-item-table {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ddd;
    border-radius: 3px;
}
.ferramenta-color {
    background-color: #f1f1f1;
}
.header-table-ferramenta {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    user-select: none;
    cursor: pointer;
}
.header-table-ferramenta div {
    width: 100%;
}
.header-table-ferramenta:hover {
    background-color: rgb(238, 255, 238);
    border-bottom: 1px solid #eee;
}
</style>