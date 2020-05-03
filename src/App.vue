<template>
    <div id="app">
        <Header />
        <Content />
        <Footer />
    </div>
</template>

<script>
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

export default {
    name: "App",
    components: { Header, Content, Footer }
};
</script>

<style>
body {
    margin: 0;
}
* {
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* background-color: rgb(219, 246, 255); */
    color: #111;
    height: 100vh;
    display: grid;
    grid-template: "header" "content" "footer";
    grid-template-rows: 60px 1fr 18px;
    grid-template-columns: 1fr;
}
</style>
