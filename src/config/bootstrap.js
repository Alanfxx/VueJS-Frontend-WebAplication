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
    // NavbarPlugin,
    // TablePlugin,
    // LayoutPlugin,
    FormGroupPlugin,
    ModalPlugin,
    InputGroupPlugin,
    FormSelectPlugin
} from 'bootstrap-vue'

Vue.use(ButtonPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(AvatarPlugin)
Vue.use(ToastPlugin)
// Vue.use(TooltipPlugin)
Vue.use(SpinnerPlugin)
// Vue.use(NavbarPlugin)
// Vue.use(TablePlugin)
// Vue.use(LayoutPlugin)
Vue.use(FormGroupPlugin)
Vue.use(ModalPlugin)
Vue.use(InputGroupPlugin)
Vue.use(FormSelectPlugin)