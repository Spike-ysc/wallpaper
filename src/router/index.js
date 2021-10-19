import Vue from 'vue'
import Router from 'vue-router'
// import movie from '@/page/movie/movie'
// import wallpaper from '@/page/wallpaper/index'
// import wallpapertotal from '@/page/wallpaper/index-total'
// import animation from '@/page/animation/index'
// import book from '@/page/book/index'
// import photo from '@/page/wallpaper/photo'
// import wallpaperinfinite from '@/page/wallpaper/index-infinite'
// import error from '@/page/error/404'

//路由懒加载
const movie = () =>
    import ("../page/movie/movie.vue")
const wallpaper = () =>
    import ("../page/wallpaper/index.vue")
const wallpapertotal = () =>
    import ("../page/wallpaper/index-total.vue")
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

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '',
            component: wallpaperinfinite
        },
        {
            path: "/photo/:id",
            name: 'photo',
            component: photo
        },
        {
            path: "/wallpaper-infinite",
            name: 'wallpaper-infinite',
            component: wallpaperinfinite
        },
        {
            path: '/wallpaper-total',
            name: 'wallpaper-total',
            component: wallpapertotal
        },
        {
            path: '/wallpaper',
            name: 'Wallpaper',
            component: wallpaper
        },
        {
            path: '/movie',
            name: 'movie',
            component: movie
        },
        {
            path: '/animation',
            name: 'animation',
            component: animation
        },
        {
            path: '/book',
            name: 'book',
            component: book
        },
        {
            path: '/error',
            name: 'error',
            component: error
        }
    ]
})