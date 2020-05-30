<template>
  <div class="campos-aparelho">
    <div>
      <span>Tipo</span>
      <p>{{aparelho.tipo}}</p>
    </div>
    <div>
      <span>Marca</span>
      <p>{{aparelho.marca}}</p>
    </div>
    <div>
      <span>Modelo</span>
      <p>{{aparelho.modelo}}</p>
    </div>
    <div>
      <span>Data de Entrada</span>
      <p>{{aparelho.dataEntrada}}</p>
    </div>
    <div>
      <span>Data de Saída</span>
      <p>{{aparelho.dataSaida || '...'}}</p>
    </div>
    <div>
      <span>Estado atual</span>
      <p>{{aparelho.estado}}</p>
    </div>
    <div>
      <span>Descrição</span>
      <p class="descricao">{{aparelho.descricao}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Campos",
  props: ["aparelho"]
};
</script>

<style>
.campos-aparelho {
  height: 100%;
  padding: 10px 10px;
}
.campos-aparelho div {
  display: flex;
}
.campos-aparelho span {
  min-width: 140px;
  color: #999;
  font-size: .9rem;
  font-weight: 600;
}
.campos-aparelho p {
  font-weight: 600;
  font-size: 1.1rem;
  color: #444;
}
p.descricao {
  font-weight: 400;
  font-size: 1rem;
  text-align: justify;
}
@media (max-width: 768px) {
  .campos-aparelho div {
    flex-direction: column;
  }
  .campos-aparelho {
    padding: 10px 0 0 0;
  }
}
</style>