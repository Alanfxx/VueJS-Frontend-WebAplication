<template>
    <div class="nav-container">
        <nav class="nav-bar">
            <router-link to="/">
                <div class="nav-bar-item" :class="flag=='/'?'selected':''">Início</div>
            </router-link>
            <router-link to="aparelhos">
                <div class="nav-bar-item" :class="flag=='/aparelhos'?'selected':''">Aparelhos</div>
            </router-link>
            <router-link to="clientes">
                <div class="nav-bar-item" :class="flag=='/clientes'?'selected':''">Clientes</div>
            </router-link>
            <router-link to="inventario">
                <div class="nav-bar-item" :class="flag=='/inventario'?'selected':''">Inventário</div>
            </router-link>
        </nav>
        <div class="toggle-menu-lateral" @click='visible.status = true' v-show="!visible.status">
            <b-icon class='list-icon' icon='list'></b-icon>
        </div>
        <UserDropdown class="dropdown-visibilidade"/>
        <MenuLateral :flag='flag' :visible='visible' />
    </div>
</template>

<script>
import UserDropdown from './UserDropdown'
import MenuLateral from './MenuLateral'

export default {
    name: "Navbar",
    components: { UserDropdown, MenuLateral },
    data: function() {
        return {
            visible: {status: false}
        }
    },
    computed: {
        flag() {
            return this.$route.path;
        }
    }
}
</script>

<style>
.nav-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}
.nav-bar {
    width: 500px;
    height: 100%;
    display: flex;
    justify-content: center;
    color: #aaa;
    font-size: 1.2rem;
}
.nav-bar a {
    display: flex;
    width: 100%;
}
.nav-bar a:hover {
    text-decoration: none;
}
.nav-bar-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #aaa;
}
.nav-bar-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #111;
    transition: 0.3s ease;
}
.selected {
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom: 3px solid limegreen;
    color: #aaa;
    font-size: 1.3rem;
}
.toggle-menu-lateral {
    display: none;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 45px;
    background-color: #7777;
    border-radius: 8px;
    margin: 0 10px;
    padding: 4px 0 0;
    cursor: pointer;
}
.toggle-menu-lateral .list-icon {
    width: 40px;
    height: 40px;
}
@media (max-width: 900px){
    .toggle-menu-lateral {
        display: flex;
    }
    .nav-bar {
        display: none;
    }
    .dropdown-visibilidade {
        display: none;
    }
    .nav-container {
        justify-content: flex-end;
    }
}
</style>