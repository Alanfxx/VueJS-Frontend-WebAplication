<template>
    <div class="table-container">
        <div class="header-tabela">
            <div @click="setKeyTable('name')">
                <strong>Nome</strong>
                <div v-show="keyTable.key === 'name'">
                    <b-icon class='ml-1' icon="chevron-compact-down" v-show="keyTable.order === 'cresc'"></b-icon>
                    <b-icon class='ml-1' icon="chevron-compact-up" v-show="keyTable.order === 'decr'"></b-icon>
                </div>
            </div>
            <div @click="setKeyTable('ref')" v-if="tabAtual === 'pecas'">
                <strong>Referência</strong>
                <div v-show="keyTable.key === 'ref'">
                    <b-icon class='ml-1' icon="chevron-compact-down" v-show="keyTable.order === 'cresc'"></b-icon>
                    <b-icon class='ml-1' icon="chevron-compact-up" v-show="keyTable.order === 'decr'"></b-icon>
                </div>
            </div>
            <div @click="setKeyTable('quant')">
                <strong>Quantidade</strong>
                <div v-show="keyTable.key === 'quant'">
                    <b-icon class='ml-1' icon="chevron-compact-down" v-show="keyTable.order === 'cresc'"></b-icon>
                    <b-icon class='ml-1' icon="chevron-compact-up" v-show="keyTable.order === 'decr'"></b-icon>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TableContainer',
    props: [ 'tabAtual' ],
    data: function() {
        return {
            keyTable: {
                key: null,
                order: 'cresc'
            },
        }
    },
    methods: {
        setKeyTable(key) {
            if(this.keyTable.key === key) {
                if(this.keyTable.order === 'cresc') {
                    this.keyTable.order = 'decr'
                } else {
                    this.keyTable.order = 'cresc'
                }
            } else {
                this.keyTable.key = key
                this.keyTable.order = 'cresc'
            }
            if(this.tabAtual === 'pecas'){
                this.$store.commit('pecasSortBy', this.keyTable)
            } else {
                this.$store.commit('ferramentasSortBy', this.keyTable)
            }
        }
    }
};
</script>

<style>
.table-container {
    min-width: 300px;
    width: 100%;
}
.header-tabela {
    height: 40px;
    display: flex;
    align-items: center;
    user-select: none;
    /* border-radius: 8px; */
    /* border-top: 1px solid #ccc; */
    border-bottom: 1px solid #ccc;
    background: #fafafa;
    padding: 0 10px;
}
.header-tabela > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: cell;
}
.header-tabela strong {
    color: #777;
    font-size: 0.9rem;
}
</style>