import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import progressive from 'progressive-image/dist/vue'
import 'progressive-image/dist/index.css'


import ELEMENT from 'element-ui'
Vue.use(ELEMENT)

Vue.use(progressive, {
    removePreview: true,
    scale: true
})

Vue.config.productionTip = false

// Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')