<template>
    <div class="peca-table">
        <div class="header-tabela">
            <div @click="setKeyTable('name')" class="header-tabela-item">
                <strong>Nome</strong>
                <div v-show="keyTable.key === 'name'">
                    <b-icon class='ml-1' icon="chevron-compact-down" v-show="keyTable.order === 'cresc'"></b-icon>
                    <b-icon class='ml-1' icon="chevron-compact-up" v-show="keyTable.order === 'decr'"></b-icon>
                </div>
            </div>
            <div @click="setKeyTable('ref')" class="header-tabela-item">
                <strong>Referência</strong>
                <div v-show="keyTable.key === 'ref'">
                    <b-icon class='ml-1' icon="chevron-compact-down" v-show="keyTable.order === 'cresc'"></b-icon>
                    <b-icon class='ml-1' icon="chevron-compact-up" v-show="keyTable.order === 'decr'"></b-icon>
                </div>
            </div>
            <div @click="setKeyTable('quant')" class="header-tabela-item">
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
    name: 'PecaTable',
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
            this.$store.commit('pecasSortBy', this.keyTable)
        }
    }
};
</script>

<style>
.peca-table {
    width: 100%;
}
.header-tabela {
    height: 45px;
    display: flex;
    align-items: center;
    user-select: none;
    border-bottom: 2px solid #dedede;
    border-top: 1px solid #eee;
}
.header-tabela-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: cell;
}
</style>