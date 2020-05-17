<template>
    <div class="app-header">
        <div class="logo-container">
            <router-link to="/">
                <img class="logo" src="@/assets/logo.svg" />
            </router-link>
        </div>
        <Navbar :rota='rota'/>
        <div class="toggle-menu-lateral" @click='visible.status = true' v-show="!visible.status">
            <b-icon class='list-icon' icon='list'></b-icon>
        </div>
        <UserDropdown class="dropdown-visibilidade"/>
        <MenuLateral :rota='rota' :visible='visible' />
    </div>
</template>

<script>
import Navbar from "./Navbar";
import UserDropdown from './UserDropdown'
import MenuLateral from './MenuLateral'

export default {
    name: "Header",
    components: { Navbar, UserDropdown, MenuLateral},
    mounted() {
        //CARREGAR DADOS
        this.$store.dispatch("loadPecas");
        this.$store.dispatch("loadFerramentas");
    },
    data: function() {
        return {
            visible: {status: false}
        }
    },
    computed: {
        rota() {
            return this.$route.path;
        }
    }
};
</script>

<style>
.app-header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background: #28a745; */
    background: #343a40;
    border-bottom: 2px solid limegreen;
    z-index: 5;
}
.logo-container {
    width: 90px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
}
.logo {
    height: 40px;
    user-select: none;
    transition: 0.2s ease;
}
.logo:hover {
    height: 48px;
    transition: 0.1s ease;
}
.toggle-menu-lateral {
    display: none;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 45px;
    background-color: #7777;
    border-radius: 8px;
    margin-right: 15px;
    padding: 4px 0 0;
    cursor: pointer;
}
.toggle-menu-lateral .list-icon {
    width: 40px;
    height: 40px;
}
@media (max-width: 900px) {
    .toggle-menu-lateral {
        display: flex;
    }
    .dropdown-visibilidade {
        display: none;
    }
    .logo-container {
        margin-left: 15px;
    }
}
</style>