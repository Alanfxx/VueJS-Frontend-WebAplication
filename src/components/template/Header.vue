<template>
    <div class="app-header">
        <div class="header-box">
            <img class="logo" src="@/assets/logo.svg" />
            <nav>
                <div>
                    <b-button-group>
                        <b-button variant="outline-primary">
                            <b-icon class="mr-2" icon="inbox-fill"></b-icon>Equipamento
                        </b-button>
                        <b-button to="usuarios" variant="outline-primary">
                            <b-icon class="mr-2" icon="person-fill"></b-icon>Usuários
                        </b-button>
                        <b-button to="inventario" variant="outline-primary">
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
import UserDropdown from '../header/UserDropdown'

export default {
    components: { UserDropdown }
};
</script>

<style>
.app-header {
    grid-area: "header";
    z-index: 1;
    display: flex;
    justify-content: center;
    color: #1a6effbb;
}
.header-box {
    width: 1280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo {
    height: 70px;
    /* margin: 0 20px; */
}
/* .header-box a {
    font-size: 1.5rem;
    color: #fff;
    text-decoration: none;
    padding: 0 10px;
}
.header-box a:hover {
    text-decoration: none;
} */

@media (max-width: 1280px) {
    .header-box {
        width: 100%;
    }
}
</style>