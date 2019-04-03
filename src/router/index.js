import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import userlist from '@/views/user'
import RightsList from '@/views/Rights'
import RolesList from '@/views/Roles'
import goodsList from '@/views/goods'
import goodsAdd from '@/views/goods/goodsadd'

Vue.use(Router)

const route = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/users', component: userlist },
        { path: '/Rights', component: RightsList },
        { path: '/Roles', component: RolesList },
        { path: '/goods', component: goodsList },
        { path: '/toadd', component: goodsAdd }
      ]
    }
  ]
})

route.beforeEach((to, from, next) => {
  // console.log(to,from)
  if (to.path === '/login') {
    return next()
  }
  const token = window.localStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})

export default route
