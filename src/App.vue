<template>
    <div id="app" :class="{other: !isMenuVisible}">
        <Header v-if="isMenuVisible"/>
        <Loading v-if="validatingToken" />
        <Content v-else />
        <Footer />
    </div>
</template>

<script>
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Loading from './components/Loading'
import axios from 'axios'
import {baseApiUrl, userKey} from '@/global'

import { mapState } from "vuex"

export default {
    name: "App",
    components: { Header, Content, Footer, Loading },
    data: function() {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if(!userData) {
                console.log('entrou ' + userData )
                this.validatingToken = false
                return this.$router.push({name: 'auth'})
            }

            const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

            if(res.data) {
                this.$store.commit('setUser', userData)
            } else {
                console.log('Entrou.... remove' + res.data)
                localStorage.removeItem(userKey)
                this.$router.push({name: 'auth'})
            }

            this.validatingToken = false
        }
    },
    computed: {
        ...mapState(["isMenuVisible"])
    },
    created() {
        this.validateToken()
    },
    // beforeDestroy() { //apenas teste
    //     localStorage.removeItem(userKey)
    //     this.$store.commit('setUser', null)
    // }
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
#app.other {
    grid-template: "content" "footer";
    grid-template-rows: 1fr 18px;
    grid-template-columns: 1fr;
}
</style>
