<template>
    <div class="menu-lateral" v-show="visible.status"
        @focusout="visible.status = false" tabindex="1">
        <nav class="nav-bar-lateral" >
            <div class="nav-bar-lateral-item" @click="navegar('Home')"
                :class="rota=='/'?'selected-lateral':''" >Início</div>
            <div class="nav-bar-lateral-item" @click="navegar('AparelhoPages')"
                :class="rota=='/aparelhos'?'selected-lateral':''" >Aparelhos</div>
            <div class="nav-bar-lateral-item" @click="navegar('UsuarioPages')"
                :class="rota=='/clientes'?'selected-lateral':''" >Clientes</div>
            <div class="nav-bar-lateral-item" @click="navegar('InventarioPages')"
                :class="rota=='/inventario'?'selected-lateral':''" >Inventário</div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'MenuLateral',
    props: ['rota', 'visible'],
    methods: {
        navegar(name){
            if(this.$router.currentRoute.name !== name)
            this.$router.push({ name });
        }
    },
    watch: {
        visible: {
            deep: true,
            handler() {
                if(this.visible.status) {
                    setTimeout(() => {
                        document.querySelector('.menu-lateral').focus()
                    }, 100)
                }
            }
        }
    }
   
};
</script>

<style>
.menu-lateral {
    outline: none;
    position: absolute;
    right: 0px;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: 100%;
    background-color: rgb(52, 58, 64);
    user-select: none;
}
.nav-bar-lateral {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.nav-bar-lateral a:hover {
    text-decoration: none;
}
.nav-bar-lateral-item {
    color: #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: 2px;
    cursor: pointer;
}
.selected-lateral {
    background-color: rgba(255, 255, 255, 0.1);
    border-left: 8px solid limegreen;
    color: greenyellow;
    font-size: 1.2rem;
    transition: .1s ease;
}
</style>