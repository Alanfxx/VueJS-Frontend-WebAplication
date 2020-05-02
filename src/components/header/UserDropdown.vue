<template>
    <div class="user-dropdown">
        <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
            <b-dropdown class="drop mx-1" right :text="user.name" variant="outline-success">
                <!-- <div class="user-dropdown-img">
                    <b-avatar class="ml-2 mr-1" variant="primary" size="40px" alt="User"></b-avatar>
                </div> -->
                <b-dropdown-item variant="success">
                    <a><b-icon class="mr-2" icon="person-lines-fill"></b-icon>Configurações</a>
                </b-dropdown-item>
                <b-dropdown-item variant="success">
                    <a><b-icon class="mr-2" icon="box-arrow-left"></b-icon>Sair</a>
                </b-dropdown-item>
            </b-dropdown>
        </b-button-toolbar>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "UserDropdown",
    computed: {
        ...mapState(["user"])
    }
};
</script>

<style>

</style>