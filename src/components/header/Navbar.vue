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
        <!-- UserDropdown -->
        <UserDropdown />
    </div>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: "Navbar",
    components: { UserDropdown },
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
}
.nav-bar {
    width: 500px;
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
/* @media (max-width: 575px){
    
} */
</style>