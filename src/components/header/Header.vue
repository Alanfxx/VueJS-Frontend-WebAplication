<template>
    <div class="app-header">
        <router-link to="/">
            <div class="logo-container">
                <img class="logo" src="@/assets/logo.svg" />
            </div>
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
.logo-container{
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo {
    height: 40px;
    user-select: none;
    transition: .2s ease;
}
.logo:hover {
    height: 48px;
    transition: .1s ease;
}
</style>