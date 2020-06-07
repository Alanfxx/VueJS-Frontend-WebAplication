<template>
    <div class="app-header">
        <div class="logo-container">
            <router-link to="/">
                <img class="logo" src="@/assets/logo.svg" />
            </router-link>
        </div>
        <Navbar :rota='rota'/>
        <div class="toggle-menu-lateral" @click='visible.status = !visible.status'>
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
        this.$store.dispatch("loadAparelhos");
        this.$store.dispatch("loadClientes");
        this.$store.dispatch("loadPecas");
        this.$store.dispatch("loadFerramentas");

        //Setar Aside como escondido em telas pequenas
        if(screen.width < 768) {
            this.$store.state.global.ctrlGlobal.reduce = true
        }
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
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #343a40;
    z-index: 5;
    user-select: none;
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
    height: 35px;
    user-select: none;
    transition: 0.2s ease;
}
.logo:hover {
    height: 40px;
    transition: 0.1s ease;
}
.toggle-menu-lateral {
    display: none;
    align-items: center;
    justify-content: center;
    background-color: #7777;
    border-radius: 8px;
    margin-right: 15px;
    padding: 3px 5px 1px;
    cursor: pointer;
}
.toggle-menu-lateral .list-icon {
    width: 30px;
    height: 30px;
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