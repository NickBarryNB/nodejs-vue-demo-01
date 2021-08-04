import Vue from 'vue'
import Router from 'vue-router'
// 导入组件
import Login from '../components/Login'
import Appindex from '../components/home/Appindex'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // 前端路由mode：使用history路由模式，不需要加#访问url目录,另一种是hash模式，即使用#/监听定位
  mode: 'history',
  routes: [
    // 下面都是固定写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: Appindex,
      // 在需要拦截的路由中加一条元数据，设置一个 requireAuth 字段
      meta: {
        requireAuth: true
      }
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
