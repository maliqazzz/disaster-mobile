import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Informasi from '../views/Informasi.vue'
import Notifikasi from '../views/Notifikasi.vue'
import Statistik from '../views/statistik/Statistik.vue'
import DateRange from '../views/DateRange.vue'
import About from '../views/About.vue'
import NotifSetting from '../views/NotifSetting.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/informasi',
    name: 'Informasi',
    component: Informasi
  },
  {
    path: '/notifikasi',
    name: 'Notifikasi',
    component: Notifikasi
  },
  {
    path: '/statistik',
    name: 'Statistik',
    component: Statistik
  },
  {
    path: '/daterange',
    name: 'DateRange',
    component: DateRange
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/notifsetting',
    name: 'NotifSetting',
    component: NotifSetting
  }
  
]

const router = new VueRouter({
  routes
})

export default router
