import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import tableRouter from '@/router/modules/table'

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
        meta: {title: 'Dashboard' , icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
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
];
//动态路由
export const asyncRoutes = [
  {
    path: '/form',
    component: Layout,
    meta: {title: 'Form', icon: 'form', roles: ['admin']},
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form', roles: ['admin']}
      }
    ]
  },
  tableRouter
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
