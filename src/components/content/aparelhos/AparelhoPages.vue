<template>
    <div class="aparelhos-pages">
        <PageTitle  icon="display-fill" main="Aparelhos" 
            sub="Subtítulo da página Aparelhos"/>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue'
export default {
    name: 'aparelhos-pages',
    components: { PageTitle }
};
</script>

<style>
.aparelhos-pages {
    width: 90%;
}
</style>