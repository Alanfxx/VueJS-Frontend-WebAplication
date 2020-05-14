import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

// import BootstrapVue from 'bootstrap-vue'
// Vue.use(BootstrapVue)

import { 
    ButtonPlugin,
    FormInputPlugin, 
    FormPlugin, 
    BootstrapVueIcons, 
    AvatarPlugin,  
    ToastPlugin, 
    // TooltipPlugin,
    SpinnerPlugin,
    NavbarPlugin,
    CardPlugin,
    TabsPlugin,
    TablePlugin,
    LayoutPlugin,
    FormGroupPlugin,
    ModalPlugin
} from 'bootstrap-vue'

Vue.use(ButtonPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(AvatarPlugin)
Vue.use(ToastPlugin)
// Vue.use(TooltipPlugin)
Vue.use(SpinnerPlugin)
Vue.use(NavbarPlugin)
Vue.use(CardPlugin)
Vue.use(TabsPlugin)
Vue.use(TablePlugin)
Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(ModalPlugin)