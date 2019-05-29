import Vue from 'vue'
import Router from 'vue-router'

//导入登陆组件 这个@号，自动定到src目录文件
import Login from '@/components/login'
import Home from '@/components/home'
import Users from '@/components/users'
import moment from 'moment'

Vue.use(Router)

//新建一个全局过滤器(处理时间格式)
Vue.filter('fromDate',(v) => {
  return moment(v).format('YYYY-MM-DD')
})



export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users,
        }
      ]

    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
