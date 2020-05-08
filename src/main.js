import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'

Vue.config.productionTip = false

//TEMPORARIO!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQWxhbiBhZG0iLCJlbWFpbCI6ImFsYW4tYWRtQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1ODg5Mzk3NjgsImV4cCI6MTU4OTE5ODk2OH0.HIWmznZZ2MnqU2HWykJ6EuZKjQASgTagEoqC5BWBhwU'

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
