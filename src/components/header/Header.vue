<template>
    <div class="app-header">
        <router-link to="/">
            <img class="logo" src="@/assets/logo.svg" />
        </router-link>
        <Navbar />
    </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: { Navbar },
    mounted() {
        //CARREGAR DADOS
        this.$store.dispatch('loadPecas')
        this.$store.dispatch('loadFerramentas')
    }
};
</script>

<style>
.app-header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #28a745; */
    background-color: #343a40;
    border-bottom: 2px solid limegreen;
    z-index: 5;
}
.logo {
    height: 40px;
    margin: 0 70px;
    user-select: none;
}
.user-dropdown {
    margin-right: 20px;
}
</style>