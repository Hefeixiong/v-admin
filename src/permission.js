import router from './router';
import store from './store';
import Vue from 'vue';


import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({showSpinner: false}); // NProgress Configuration

// import {notification} from 'ant-design-vue';
import {ACCESS_TOKEN} from "@/store/mutation-types";

//导航守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = Vue.ls.get(ACCESS_TOKEN);
  console.log(token)
  if (token) {
    if (to.path === '/login') {
      next({path: '/dashboard'});
      NProgress.done();
    } else {
      if (!store.getters.userInfo.user_id) {
        store.dispatch('user/GetInfo').then((response) => {
          const { roles } = response
          store.dispatch('permission/generateRoutes', roles).then(res => {
            // dynamically add accessible routes
            router.addRoutes(res);
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({...to, replace: true});
            NProgress.done();
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