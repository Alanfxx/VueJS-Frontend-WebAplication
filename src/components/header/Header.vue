<template>
    <div class="app-header">
        <router-link to="/">
            <img class="logo" src="@/assets/logo.svg" />
        </router-link>
        <Navbar />
        <UserDropdown class="user-dropdown" />
    </div>
</template>

<script>
import Navbar from "./Navbar";
import UserDropdown from "./UserDropdown";

export default {
    components: { UserDropdown, Navbar }
};
</script>

<style>
.app-header {
    grid-area: 'header';
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(to right, limegreen 0%, rgb(0, 97, 0) 100%);
    border-image-slice: 1;
    z-index: 5;
}
.logo {
    height: 50px;
    margin-left: 20px;
    user-select: none;
}
.user-dropdown {
    margin-right: 20px;
}
</style>