<template>
    <div class="app-content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style>
.app-content {
    grid-area: 'content';
    display: flex;
    justify-content: center;
    z-index: 2;
}
</style>