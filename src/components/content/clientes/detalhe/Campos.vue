<template>
  <div class="campos-cliente">
    <div>
      <span>Nome</span>
      <p>{{cliente.name}}</p>
    </div>
    <div>
      <span>Telefones</span>
      <p>{{cliente.tel}}</p>
    </div>
    <div>
      <span>Aparelhos</span>
      <p>{{cliente.aparelhos}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Campos",
  props: ["cliente"]
};
</script>

<style>
.campos-cliente {
  height: 100%;
  padding: 10px 10px;
}
.campos-cliente div {
  display: flex;
}
.campos-cliente span {
  min-width: 140px;
  color: #999;
  font-size: .9rem;
  font-weight: 600;
}
.campos-cliente p {
  font-weight: 600;
  font-size: 1.1rem;
  color: #444;
}
@media (max-width: 768px) {
  .campos-cliente div {
    flex-direction: column;
  }
  .campos-cliente {
    padding: 10px 0 0 0;
  }
}
</style>