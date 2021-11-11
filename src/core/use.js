import Vue from 'vue'


import VueStorage from 'vue-ls'




// vue-ls options
// 缓存方案
const storageOptions = {
  namespace: 'hxx__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}

Vue.use(VueStorage, storageOptions)
