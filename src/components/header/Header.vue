<template>
    <div class="app-header">
        <router-link to="/">
            <img class="logo" src="@/assets/logo.svg" />
        </router-link>
        <Navbar />
    </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
    components: { Navbar }
};
</script>

<style>
.app-header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #28a745; */
    background-color: #343a40;
    border-bottom: 2.5px solid transparent;
    border-image: linear-gradient(to right, limegreen 0%, rgb(0, 97, 0) 100%);
    border-image-slice: 1;
    z-index: 5;
}
.logo {
    height: 40px;
    margin: 0 40px 0 40px;
    user-select: none;
}
.user-dropdown {
    margin-right: 20px;
}
</style>