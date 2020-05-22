<template>
    <nav class="nav-bar">
        <router-link to="/">
            <div class="nav-bar-item" :class="rota=='/'?'selected':''">Início</div>
        </router-link>
        <router-link to="aparelhos">
            <div class="nav-bar-item" :class="rota=='/aparelhos'?'selected':''">Aparelhos</div>
        </router-link>
        <router-link to="clientes">
            <div class="nav-bar-item" :class="rota=='/clientes'?'selected':''">Clientes</div>
        </router-link>
        <router-link to="inventario">
            <div class="nav-bar-item" :class="rota=='/inventario'?'selected':''">Inventário</div>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    props: ["rota"]
};
</script>

<style>
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
    border-bottom: 4px solid limegreen;
    /* border-bottom: 4px solid white; */
    color: #aaa;
    font-size: 1.3rem;
    box-shadow: 0 -10px 10px 0 #222;
}

@media (max-width: 900px) {
    .nav-bar {
        display: none;
    }
}
</style>