import Vue from 'vue'
// import Cookies from 'js-cookie'

import App from './App.vue'
import store from './store';
import router from './router'
//引用Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ebLang from 'element-ui/lib/locale/lang/en'

import './permission'
//全局声明
import '@/styles/index.scss' //register global scss
import './icons'

//vue-ls
import '@/core/use';
//全局使用antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

Vue.use(ElementUI , {
  // size: Cookies.get('size') || 'medium',
  locale: ebLang // 如果使用中文，无需设置，请删除
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
