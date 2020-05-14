<template>
    <div class="aparelhos-pages">
        <PageTitle  icon="display-fill" main="Aparelhos" 
            sub="Controle de Aparelhos"/>
    </div>
</template>

<script>
import PageTitle from '../PageTitle.vue'

export default {
    name: 'aparelhos-pages',
    components: { PageTitle }
};
</script>

<style>
.aparelhos-pages {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>