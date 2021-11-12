import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters.js'
import settings from '@/store/modules/settings.js'
import tagsView from './modules/tagsView.js'
import app from '@/store/modules/app.js'
import permission from '@/store/modules/permission.js'
import user from '@/store/modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    tagsView,
    user
  },
  getters
})
export default store