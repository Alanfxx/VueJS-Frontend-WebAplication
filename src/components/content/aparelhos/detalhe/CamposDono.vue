<template>
  <div class="campos-dono">
    <div>
      <span>Nome</span>
      <p>{{cliente.nome}}</p>
    </div>
    <div>
      <span>Apelido</span>
      <p>{{cliente.apelido}}</p>
    </div>
    <div>
      <span>Cidade</span>
      <p>{{cliente.cidade}}</p>
    </div>
    <div>
      <span>Telefone</span>
      <p>{{cliente.tels}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CamposDono",
  props: ["cliente"],
};
</script>

<style>
.campos-dono {
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  padding: 10px 10px;
  min-width: 250px;
}
.campos-dono div {
  min-width: max-content;
  display: flex;
}
/* .campos-dono span {
  min-width: 60px;
  color: #999;
  font-size: .9rem;
  font-weight: 600;
} */
.campos-dono p {
  min-width: 180px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #444;
}
</style>