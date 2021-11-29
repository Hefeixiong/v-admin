import router from './router';
import store from './store';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import {getToken} from '@/utils/auth' // progress bar style

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
      if (!store.getters.userInfo.user_id) {
        debugger
        store.dispatch('user/getInfo').then((response) => {
          const { roles } = response
          store.dispatch('permission/generateRoutes', roles).then(res => {
            // dynamically add accessible routes
            router.addRoutes(res);
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({...to, replace: true});
            NProgress.done();
            debugger
          }).catch(error => console.log(error));
        }).catch(() => {
          store.dispatch('user/logout').then(() => {
            next({path: '/login', query: {redirect: to.fullPath}});
          });
          // console.log(error);
        });
      }
      next();
      NProgress.done();

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
