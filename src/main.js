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

const _hmt = _hmt || [];

window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?6f2212ee8e3fd2f83702bd023606f48e';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
}());

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
    if (to.meta.title) {
        //判断是否有标题
        console.log(to.meta.title)
        document.title = to.meta.title
    } else {
        document.title = 'Wallpaper-壁纸'
    }
    if (_hmt) {
        if (to.path) {
            // eslint-disable-next-line
            _hmt.push(['_trackPageview', to.fullPath]);
        }
    }
    if (to.matched.length === 0) {
        from.name ? next({
            name: from.name
        }) : next('/error');
    } else {
        next();
    }
});

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')