<template>
  <div class="aparelho">
    <div class="imagem-aparelho">
      <img :src="require(`@/assets/aparelhos/${aparelho.tipo}.png`)" alt="Imagem do aparelho"/>
    </div>
    <div class="dados-aparelho">
      <div class="aparelho-campos">
        <div>
          <span>Tipo</span>
          <p>{{aparelho.tipo}}</p>
        </div>
        <div>
          <span>Marca</span>
          <p>{{aparelho.marca}}</p>
        </div>
        <div>
          <span>Estado</span>
          <p>{{aparelho.estado}}</p>
        </div>
      </div>
      <span class="bt-detalhe-aparelho" @click="$emit('detalhe')">
        <b-icon icon="aspect-ratio" class="mb-0 mt-0"></b-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aparelho",
  props: ["aparelho"],
  computed: {
    imagem() {
      return `assets/TV.svg`
    }
  }
};
</script>

<style>
.aparelho {
  width: 290px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 130px 1fr;
  grid-template-areas: "img content";
  border-radius: 4px;
  border: 1px solid #0002;
  margin: 10px;
  transition: 0.2s ease;
  background: #eee;
  /* box-shadow: 0 2px #0001; */
}
.aparelho:hover {
  box-shadow: 0 3px 5px 1px #0002;
}
.imagem-aparelho {
  grid-area: img;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.imagem-aparelho > img {
  position: relative;
  max-width: 100%;
  max-height: 120%;
  /* border-radius: 50%; */
}
.dados-aparelho {
  grid-area: content;
  position: relative;
  padding: 8px 8px 2px 15px;
}
.aparelho-campos span {
  height: 15px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  user-select: none;
}
.aparelho-campos p {
  font-weight: 600;
  color: #555;
  text-align: left;
  margin-bottom: 7px;
}
.aparelho:hover .bt-detalhe-aparelho {
  display: flex;
}
.bt-detalhe-aparelho:hover {
  font-size: 2rem;
  transition: 0.1s ease;
}
.bt-detalhe-aparelho {
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  right: 5px;
  top: 5px;
  font-size: 1.7rem;
  color: #0009;
  user-select: none;
  cursor: pointer;
}
@media (max-width: 768px) {
  .bt-detalhe-aparelho {
    display: flex;
  }
}
</style>