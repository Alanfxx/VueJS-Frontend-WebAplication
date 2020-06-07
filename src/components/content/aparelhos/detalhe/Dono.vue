<template>
  <div class="dono-aparelho" @focusout="verDono.status=false" tabindex="1">
    <img :src="require(`@/assets/clientes/cliente.png`)" alt="Imagem do cliente" />
    <CamposDono :cliente="dono" />
    <b-icon icon="x-circle-fill" class="fechar" @click="$emit('fechar')"></b-icon>
    <b-icon id="bt-campos-dono-aparelhos" icon="box-arrow-in-up-right" @click="detalheDono"></b-icon>
  </div>
</template>

<script>
import CamposDono from "./CamposDono";
export default {
  name: "Dono",
  components: { CamposDono },
  props: ["dono", "verDono"],
  data: function() {
    return {
      ctrlCliente: this.$store.state.clientes.ctrlCliente
    };
  },
  methods: {
    detalheDono() {
      this.ctrlCliente.tab = "detalhe";
      this.ctrlCliente.itemAtual = { ...this.dono };
      this.$router.push({ path: "/clientes" });
    }
  },
  watch: {
    verDono: {
      deep: true,
      handler() {
        if (this.verDono.status) {
          setTimeout(
            () => document.querySelector(".dono-aparelho").focus(),
            50
          );
        }
      }
    }
  }
};
</script>

<style>
.dono-aparelho img {
  max-width: 100px;
  border-radius: 5%;
  margin: 0 20px;
}
.dono-aparelho {
  position: absolute;
  top: 40px;
  left: auto;
  right: auto;
  z-index: 50;
  min-width: 290px;
  border-radius: 5px;
  box-shadow: 0 0 15px #0006;
  background: rgb(237, 242, 247);
  padding: 10px;
  outline: none;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-evenly;
  align-items: center;
}
.dono-aparelho .fechar:hover {
  color: #000a;
  width: 30px;
  height: 30px;
  transition: 0.1s ease;
}
.dono-aparelho .fechar {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  user-select: none;
  color: #0006;
}
#bt-campos-dono-aparelhos {
  width: 25px;
  height: 25px;
  color: cornflowerblue;
  position: absolute;
  right: 6px;
  bottom: 6px;
  cursor: pointer;
}
</style>