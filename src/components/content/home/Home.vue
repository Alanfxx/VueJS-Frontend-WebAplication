<template>
    <div class="home-page">
        <Clock class='clock' />
        <img src="@/assets/web-contrucao.svg" alt="Logo" class="logo-home" />
    </div>
</template>

<script>
import Clock from "./Clock";

export default {
    components: { Clock }
};
</script>

<style>
.home-page {
    width: 100%;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    background-color: rgb(238, 255, 238);
}
.logo-home {
    width: 65%;
    margin-left: 100px;
    user-select: none;
}
.clock {
    position: absolute;
    top: 100px;
    right: 8%;
}
@media (max-width: 1000px) {
    .home-page {
       justify-content: center; 
    }
    .logo-home {
        width: 90%;
        height: 30%;
        margin: 0;
    }
    .clock {
        position: unset;
        height: 70px;
    }
}
</style>