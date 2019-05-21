import Vue from 'vue'
import Router from 'vue-router'

//导入登陆组件 这个@号，自动定到src目录文件
import Login from '@/components/login.vue'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
