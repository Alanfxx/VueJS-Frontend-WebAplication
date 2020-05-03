<template>
    <div class="inventario-pages">
        <PageTitle icon="tools" main="Inventário" 
            sub="Subtítulo da página Inventário" />
    </div>
</template>

<script>
import PageTitle from "../PageTitle.vue";

export default {
    name: "inventario-pages",
    components: { PageTitle }
};
</script>

<style>
.inventario-pages {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>