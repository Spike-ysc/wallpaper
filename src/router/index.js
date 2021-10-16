import Vue from 'vue'
import Router from 'vue-router'
import movie from '@/page/movie/movie'
import wallpaper from '@/page/wallpaper/index'
import wallpapertotal from '@/page/wallpaper/index-total'
import animation from '@/page/animation/index'
import book from '@/page/book/index'
import photo from '@/page/wallpaper/photo'
import wallpaperdemo from '@/page/wallpaper/index-demo'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '',
            component: wallpaper
        },
        {
            path: "/photo/:id",
            name: 'photo',
            component: photo
        },
        {
            path: "/wallpaper-demo",
            name: 'wallpaper-demo',
            component: wallpaperdemo
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
    ]
})