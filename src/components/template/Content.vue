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
    z-index: 1;
    display: flex;
    justify-content: center;
}
.box {
    width: 80%;
    border-radius: 10px;
    box-shadow: 0 0 30px 0 rgba(26, 110, 255, 0.15);
    margin: 20px 0;
    background-color: #fff2;
    color: #444;
    display: flex;
    justify-content: center;
}
</style>