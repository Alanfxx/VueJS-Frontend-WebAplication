<template>
  <div id="app" :class="{other: !isMenuVisible.status}">
    <Header v-if="isMenuVisible.status" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Loading from "./components/Loading";
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";

export default {
  name: "App",
  components: { Header, Content, Footer, Loading },
  data: function() {
    return {
      validatingToken: false,
      isMenuVisible: this.$store.state.global.isMenuVisible
    };
  },
  methods: {
    appToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Validação",
        variant: variant,
        solid: true,
        noAutoHide: true
      })
    },
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.dispatch("adicionarUser", null);
      this.$store.commit("setUser", null); //

      if (!userData) {
        this.validatingToken = false;
        if (this.$router.currentRoute.name !== "auth")
          this.$router.push({ name: "auth" })
        return;
      }

      const res = await axios
        .post(`${baseApiUrl}/validateToken`, userData)
        .catch(() => {
            this.appToast("Problema de conexão. Tente recarregar a página", "danger")
        })

      if (res.data) {
        this.$store.dispatch("adicionarUser", userData);
        this.$store.commit("setUser", userData); //>
      } else {
        localStorage.removeItem(userKey);
        if (this.$router.currentRoute.name !== "auth")
          this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111;
  background-image: url(./assets/grid-light.png);
  height: 100vh;
  display: grid;
  grid-template-areas: "header" "content" "footer";
  grid-template-rows: 50px 1fr 18px;
  grid-template-columns: 1fr;
}
#app.other {
  grid-template-areas: "content" "footer";
  grid-template-rows: 1fr 18px;
  grid-template-columns: 1fr;
}
</style>