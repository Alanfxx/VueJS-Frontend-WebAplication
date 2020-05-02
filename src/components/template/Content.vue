<template>
    <div class="app-content">
        <div class="box">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.app-content {
    display: flex;
    justify-content: center;
    z-index: 2;
}
.box {
    width: 80%;
    border-radius: 10px;
    box-shadow: 0 0 20px 0 rgba(0, 90, 207, 0.1);
    margin: 5px 0 15px 0;
    background-color: rgba(255, 255, 255, 0.15);
    color: #222;
    display: flex;
    justify-content: center;
    z-index: 2;
}
</style>