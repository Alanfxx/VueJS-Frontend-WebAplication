<template>
    <nav class="nav-bar">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand to='/'>Início</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class='nav-paginas'>
                    <b-nav-item to='aparelhos'>Aparelhos</b-nav-item>
                    <b-nav-item to='clientes'>Clientes</b-nav-item>
                    <b-nav-item to='inventario'>Inventário</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!-- <b-nav-form class='mr-5' is-nav>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
                    </b-nav-form> -->

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            {{ user.name }}
                            <b-avatar class="ml-2 mr-1" variant="light" size="1.6em" alt="User"></b-avatar>
                        </template>
                        <b-dropdown-item variant="none">
                            <a><b-icon class="mr-2" icon="person-lines-fill"></b-icon> Configurações</a>
                        </b-dropdown-item>
                        <b-dropdown-item @click="logout" variant="none">
                            <a><b-icon class="mr-2" icon="box-arrow-left"></b-icon> Sair</a>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </nav>
</template>

<script>
import { mapState } from "vuex"
import { userKey } from '@/global'

export default {
    name: "UserDropdown",
    computed: {
        ...mapState(["user"])
    },
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({name: 'auth'})
        }
    }
};
</script>

<style>
.nav-bar {
    width: 100%;
}
@media (max-width: 985px){
    #nav-collapse {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: auto;
        padding: 20px;
        background-color: #28a745;
        transition: .4s ease;
        text-align: center;
    }
}
</style>