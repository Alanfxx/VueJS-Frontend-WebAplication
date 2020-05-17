<template>
	<div class="inventario-pages">
		<PageTitle icon="tools" main="Inventário" sub="Controle de peças e ferramentas" />
		<div class="admin-pages-tabs">
			<b-card no-body>
                <b-tabs card>
                    <b-tab title='Peças' active style="padding: 20px 10px;">
                        <Pecas />
                    </b-tab>
                    <b-tab title='Ferramentas' style="padding: 20px 10px;">
                        <Ferramentas />
                    </b-tab>
                </b-tabs>
            </b-card>
		</div>
	</div>
</template>

<script>
import PageTitle from "../PageTitle.vue"
import Pecas from './tabPecas/Pecas'
import Ferramentas from './tabFerramentas/Ferramentas'

export default {
	name: "inventario-pages",
    components: { PageTitle, Pecas, Ferramentas },
}
</script>

<style>
.inventario-pages {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.admin-pages-tabs {
    width: 100%;
    padding: 8px;
}
</style>