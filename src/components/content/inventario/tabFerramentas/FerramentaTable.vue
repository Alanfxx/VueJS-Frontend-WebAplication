<template>
    <div class="ferramenta-table">
        <div class="header-tabela">
            <div @click="setKeyTable('name')" class="header-tabela-item">
                <strong>Nome</strong>
                <div v-show="keyTable.key === 'name'">
                    <b-icon class='ml-1' icon="chevron-compact-down" v-show="keyTable.order === 'cresc'"></b-icon>
                    <b-icon class='ml-1' icon="chevron-compact-up" v-show="keyTable.order === 'decr'"></b-icon>
                </div>
            </div>
        </div>
        <!-- Slot aqui -->
        <slot /> 
    </div>
</template>

<script>
export default {
    name: 'FerramentaTable',
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
            this.$store.commit('ferramentasSortBy', this.keyTable)
        }
    }
};
</script>

<style>
.ferramenta-table {
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