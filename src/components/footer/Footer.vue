<template>
    <div class="app-footer">
        <span>&copy; 2020 Alanfx</span>
    </div>
</template>

<script>
export default {};
</script>

<style>
.app-footer {
    grid-area: footer;
    border-top: 1px solid #ddd;
    font-size: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 2;
    user-select: none;
    background: #eee;
}
.app-footer span {
    margin-right: 15px;
}
</style>