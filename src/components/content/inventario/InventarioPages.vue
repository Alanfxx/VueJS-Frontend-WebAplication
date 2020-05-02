<template>
    <div class="inventario-pages">
        <PageTitle icon="tools" main="Inventário" 
            sub="Subtítulo da página Inventário" />
    </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle.vue";

export default {
    name: "inventario-pages",
    components: { PageTitle }
};
</script>

<style>
.inventario-pages {
    width: 90%;
}
</style>