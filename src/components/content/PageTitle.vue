<template>
    <div class="page-title">
        <div class="page-title-content">
            <h1><b-icon class="mr-1" :icon="icon"></b-icon> {{ main }}</h1>
            <h2>{{ sub }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
.page-title {
    width: 100%;
    padding: 5px 15px;
    background-color: rgb(248, 255, 248);
    border-bottom: 1px solid rgb(203, 221, 203);
    display: flex;
    justify-content: center;
}
.page-title-content {
    text-align: left;
    width: 1200px;
}
.page-title h1 {
    font-size: 1.3em;
}
.page-title h2 {
    color: #777;
    font-size: .8em;
    margin: 0;
}

@media (max-width: 1200px) {
    .page-title-content {
        width: 100%;
    }
}
</style>