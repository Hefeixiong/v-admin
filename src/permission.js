import router from './router';
import store from './store';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import {getToken} from '@/utils/auth'
import {Message} from 'element-ui'

NProgress.configure({showSpinner: false}); // NProgress Configuration

//导航守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/dashboard'});
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const {roles}  = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log('执行了permission/generateRoutes')
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
          debugger
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          console.log(error)
          debugger
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next();
      NProgress.done();
    } else {
      next({path: '/login'});
      NProgress.done();
    }
  }
});
