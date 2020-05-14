<template>
    <div class='conteiner-detalhes' :class="{esconder: !mostrarDetalhes.status}" >
        <div class="title-detalhes" @click="mostrarDetalhes.status = !mostrarDetalhes.status">
            <b-icon icon="chevron-right" v-show="mostrarDetalhes.status"></b-icon>
            <b-icon icon="chevron-left" v-show="!mostrarDetalhes.status"></b-icon>
        </div>
        <div class="body-detalhes" v-show="mostrarDetalhes.status">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConteinerDetalhes',
    props: ['mostrarDetalhes']
};
</script>

<style>
.conteiner-detalhes {
    width: 60%;
    display: flex;
    margin-left: 6px;
    transition: .5s ease;
}
.conteiner-detalhes.esconder {
    width: 30px;
    transition: .5s ease;
}

.title-detalhes {
    display: flex;
    align-items: center;
    height: 100%;
    background-color: #eee;
    user-select: none;
    padding: 3px 10px;
    text-align: center;
    cursor: pointer;
}
.title-detalhes:hover {
    box-shadow: 0 0 2px 2px #f0f0f0 ;
    background-color: rgb(238, 255, 238);
}
.body-detalhes {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>