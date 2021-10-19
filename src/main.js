import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import progressive from 'progressive-image/dist/vue'
import 'progressive-image/dist/index.css'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式


import ELEMENT from 'element-ui'
Vue.use(ELEMENT)

Vue.use(progressive, {
    removePreview: true,
    scale: true
})

Vue.config.productionTip = false

// Vue.use(ElementUI)
Vue.use(VueAxios, axios)

NProgress.configure({
    easing: 'ease', // 动画方式    
    speed: 500, // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach((to, from, next) => {
    // 每次切换页面时，调用进度条
    NProgress.start();

    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
});

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')