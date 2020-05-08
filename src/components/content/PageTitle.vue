<template>
    <div class="page-title">
        <div class="page-title-content">
            <div>
                <h1><b-icon class="mr-1" :icon="icon"></b-icon> {{ main }}</h1>
                <h2>{{ sub }}</h2>
            </div>
            <b-button class="px-4" size='sm' pill variant="outline-success">Novo</b-button>
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
    padding: 6px 15px 4px 15px;
    background-color: rgb(238, 255, 238);
    border-bottom: 1px solid rgb(203, 221, 203);
    display: flex;
    justify-content: center;
}
.page-title-content {
    text-align: left;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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