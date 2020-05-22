<template>
    <div class="item-table" :class="{'item-color': index%2==0}">
        <div class="header-table-item" @click="toggleDetalhes">
            <div v-show="!mostrarDetalhes">{{item.name}}</div>
            <div v-show="!mostrarDetalhes && item.ref">{{item.ref}}</div>
            <div v-show="!mostrarDetalhes">{{item.quant}}</div>
            <b-icon style="width: 30px; height: 30px; color: #777;" icon='chevron-double-up' v-show="mostrarDetalhes"></b-icon>
        </div>
        <ItemDetalhes :item='item' @editar="editar" :editing='editing'
            @remove="$emit('remove')" :mostrarDetalhes="mostrarDetalhes"/>
                <!-- Alterei aqui -->
    </div>
</template>

<script>
import ItemDetalhes from './ItemDetalhes'
export default {
    name: "ItemTable",
    props: [ 'item', 'index' ],
    components: { ItemDetalhes },
    data: function() {
        return {
            mostrarDetalhes: false,
            editing: {status: false}
        }
    },
    methods: {
        toggleDetalhes() {
            this.editing.status = false
            this.mostrarDetalhes = !this.mostrarDetalhes
        },
        editar(item) {
            this.$emit('editar', item)
        }
    }
}
</script>

<style>
.item-table {
    /* min-width: 300px; */
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px 10px 0;
    transition: .5s ease;
    background-color: rgba(0, 255, 128, 0.05);
}
.item-color {
    background-color: rgba(0, 255, 128, 0.1);
}
.header-table-item {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    user-select: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.header-table-item div {
    width: 100%;
}
.header-table-item:hover {
    background-color: rgba(0, 255, 128, 0.15);
}
</style>