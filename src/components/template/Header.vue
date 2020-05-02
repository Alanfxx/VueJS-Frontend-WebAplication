<template>
    <div class="app-header">
        <div class="header-box">
            <router-link to="/">
                <img class="logo" src="@/assets/logo.svg" />
            </router-link>
            <nav>
                <div>
                    <b-button-group>
                        <b-button to="/" variant="outline-success">
                            <b-icon class="mr-2" icon="house-fill"></b-icon>Início
                        </b-button>
                        <b-button to="aparelhos" variant="outline-success">
                            <b-icon class="mr-2" icon="display-fill"></b-icon>Aparelhos
                        </b-button>
                        <b-button to="clientes" variant="outline-success">
                            <b-icon class="mr-2" icon="people-fill"></b-icon>Clientes
                        </b-button>
                        <b-button to="inventario" variant="outline-success">
                            <b-icon class="mr-2" icon="tools"></b-icon>Inventário
                        </b-button>
                    </b-button-group>
                </div>
            </nav>
            <UserDropdown />
        </div>
    </div>
</template>

<script>
import UserDropdown from "../header/UserDropdown";

export default {
    components: { UserDropdown }
};
</script>

<style>
.app-header {
    grid-area: "header";
    display: flex;
    justify-content: center;
    z-index: 5;
}
.header-box {
    width: 1280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
    color: #222;
}
.logo {
    height: 70px;
}

@media (max-width: 1280px) {
    .header-box {
        width: 100%;
    }
}
</style>