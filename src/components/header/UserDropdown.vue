<template>
        <!-- @focus="handleFocus" -->
    <div class="dropdown-container" @focusout="visible = false" tabindex="0">
        <div class="dropdown-bt" @click="visible = !visible"> 
            {{user.name}}
            <b-avatar class="ml-2 mr-2" variant="light" size="1.6em" alt="User"></b-avatar>
            <b-icon icon="chevron-compact-down" v-show="!visible"></b-icon>
            <b-icon icon="chevron-compact-up" v-show="visible"></b-icon>
        </div>
        <div class="dropdown-body" v-show="visible">
            <div>
                <b-icon class="mr-2" icon="person-lines-fill"></b-icon> Configurações
            </div>
            <div @click.stop="logout">
                <b-icon class="mr-2" icon="box-arrow-left"></b-icon> Sair
            </div>
        </div>
    </div>
</template>

<script>
import { userKey } from "@/global";

export default {
    name: 'UserDropdown',
    data: function() {
        return {
            user: this.$store.state.user.user,
            visible: false
        };
    },
    methods: {
        logout() {
            this.visible = false
            localStorage.removeItem(userKey);
            this.$store.dispatch("adicionarUser", null);
            this.$router.push({ name: "auth" });
        }
    }
}
</script>

<style>
.dropdown-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #111;
    outline: none;
}
.dropdown-bt {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 170px;
    user-select: none;
    cursor: pointer;
    color: #eee;
    padding-right: 5px;
}
.dropdown-bt:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: .4s ease;
}
.dropdown-body {
    width: 180px;
    background-color: #fff;
    position: absolute;
    bottom: -170%;
    left: -15%;
    display: flex;
    flex-direction: column;
    padding: 10px 2px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
.dropdown-body div{
    padding: 6px 12px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    user-select: none;
    border-radius: 3px;
}
.dropdown-body div:hover{
    background-color: rgba(0, 83, 11, 0.7);
    color: #eee;
}
</style>