<template>
  <div class="clientes-pages">
      <PageTitle  icon="people-fill" main="Clientes" 
            sub="Subtítulo da página Clientes"/>
  </div>
</template>

<script>
import PageTitle from '../PageTitle.vue'

export default {
    name: 'clientes-pages',
    components: { PageTitle }
}
</script>

<style>
.clientes-pages {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>