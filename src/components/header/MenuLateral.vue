<template>
  <div class="menu-lateral" v-show="visible.status" @focusout="toggleMenuLateral" tabindex="1">
    <nav class="nav-bar-lateral">
      <div @click="navegar('Home')" :class="rota=='/'?'selected-lateral':''">Início</div>
      <div
        @click="navegar('AparelhoPages')"
        :class="rota=='/aparelhos'?'selected-lateral':''"
      >Aparelhos</div>
      <div
        @click="navegar('UsuarioPages')"
        :class="rota=='/clientes'?'selected-lateral':''"
      >Clientes</div>
      <div
        @click="navegar('InventarioPages')"
        :class="rota=='/inventario'?'selected-lateral':''"
      >Inventário</div>

      <div class="mt-5">
        <b-icon class="mr-2" icon="person-lines-fill"></b-icon>Configurações
      </div>
      <div @click.stop="logout">
        <b-icon class="mr-2" icon="box-arrow-left"></b-icon>Sair
      </div>
    </nav>
  </div>
</template>

<script>
import { userKey } from "@/global";

export default {
  name: "MenuLateral",
  props: ["rota", "visible"],
  methods: {
    toggleMenuLateral() {
      setTimeout(() => (this.visible.status = false), 100);
    },
    navegar(name) {
      if (this.$router.currentRoute.name !== name) this.$router.push({ name });
    },
    logout() {
      localStorage.removeItem(userKey);
      this.$store.dispatch("adicionarUser", null);
      this.$router.push({ name: "auth" });
    }
  },
  watch: {
    visible: {
      deep: true,
      handler() {
        if (this.visible.status) {
          setTimeout(
            () => document.querySelector(".menu-lateral").focus(),
            200
          );
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
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 10px 0;
  background-color: rgb(52, 58, 64, 0.9);
}
.nav-bar-lateral {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.nav-bar-lateral a:hover {
  text-decoration: none;
}
.nav-bar-lateral div {
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 2px;
  cursor: pointer;
}
.nav-bar-lateral div:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.selected-lateral {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 8px solid limegreen;
  color: greenyellow;
  font-size: 1.2rem;
  transition: 0.1s ease;
}
</style>