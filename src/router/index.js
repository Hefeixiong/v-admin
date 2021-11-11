import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
//静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {title: 'Dashboard' , icon: 'dashboard' , affix: true}
      }
    ]
  },
  //测试组件
  {
    path: '/test',
    component: () => import('@/views/test/test-svg'),
    hidden: true
  },
  {
    path: '/hamburger',
    component: () => import('@/components/Hamburger/index'),
    hidden: true
  }
]
//动态路由
export const asyncRoutes = [
  {
    path: '/form',
    component: Layout,
    meta: {title: 'Form', icon: 'form', roles: ['ops']},
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form', roles: ['ops']}
      }
    ]
  }

]

//
const router  = new Router({
  scrollBehavior: () => ({y:0}),
  routes: constantRoutes,
})
console.log('router',router)

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher
// }

export default router