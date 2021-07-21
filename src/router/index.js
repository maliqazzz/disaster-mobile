import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Informasi from '../views/Informasi.vue'
import Notifikasi from '../views/Notifikasi.vue'
import Statistik from '../views/statistik/Statistik.vue'
// import Akun from '../views/Akun.vue'


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
  // {
  //   path: '/akun',
  //   name: 'Akun',
  //   component: Akun
  // }

]

const router = new VueRouter({
  routes
})

export default router
