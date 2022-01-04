import Vue from 'vue'
import Router from 'vue-router'
// import movie from '@/page/movie/movie'
// import wallpaper from '@/page/wallpaper/index'
// import wallpapertotal from '@/page/wallpaper/index-total'
// import animation from '@/page/animation/index'
// import book from '@/page/book/index'
// import photo from '@/page/wallpaper/photo'
// import wallpaperinfinite from '@/page/wallpaper/index-infinite'
import error404 from '@/page/error/404'

//路由懒加载
const movie = () =>
    import ("../page/movie/movie.vue")
const wallpaper = () =>
    import ("../page/wallpaper/index.vue")
const wallpapertotal = () =>
    import ("../page/wallpaper/index-total.vue")
const wallpapertime = () =>
    import ("../page/wallpaper/index-time.vue")
const animation = () =>
    import ("../page/animation/index.vue")
const book = () =>
    import ("../page/book/index.vue")
const photo = () =>
    import ("../page/wallpaper/photo.vue")
const wallpaperinfinite = () =>
    import ("../page/wallpaper/index-infinite.vue")
const error = () =>
    import ("../page/error/404.vue")
const keyboard = () =>
    import ("../page/keyboard/index.vue")
const anima = () =>
    import ("../page/animation/home.vue")
const friend = () =>
    import ("../page/friend/index.vue")

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '',
            component: wallpaperinfinite,
            meta: {
                title: 'Wallpaper-壁纸'
            }
        },
        {
            path: "/photo/:id",
            name: 'photo',
            component: photo,
            meta: {
                title: '壁纸详情'
            }
        },
        {
            path: "/wallpaper-time",
            name: 'wallpaper-time',
            component: wallpapertime,
            meta: {
                title: 'Wallpaper-壁纸-更新时间'
            }
        },
        {
            path: "/wallpaper-infinite",
            name: 'wallpaper-infinite',
            component: wallpaperinfinite,
            meta: {
                title: 'Wallpaper-壁纸'
            }
        },
        {
            path: '/wallpaper-total',
            name: 'wallpaper-total',
            component: wallpapertotal,
            meta: {
                title: 'Wallpaper-壁纸'
            }
        },
        {
            path: '/wallpaper',
            name: 'Wallpaper',
            component: wallpaper,
            meta: {
                title: 'Wallpaper-壁纸'
            }
        },
        {
            path: '/movie',
            name: 'movie',
            component: movie
        },
        {
            path: '/animation',
            name: 'animation',
            component: animation,
            meta: {
                title: 'Animation'
            }
        },
        {
            path: '/book',
            name: 'book',
            component: book
        },
        {
            path: '/error',
            name: 'error',
            component: error404,
            meta: {
                title: '404'
            }
        }, {
            path: '/keyboard',
            name: 'keyboard',
            component: keyboard,
            meta: {
                title: '键盘按键测试'
            }
        }, {
            path: '/anima',
            name: 'anima',
            component: anima,
            meta: {
                title: 'Anima'
            }
        }, {
            path: '/friend',
            name: 'friend',
            component: friend,
            meta: {
                title: 'Friend'
            }
        }
    ]
})