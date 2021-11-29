import {getToken, setToken} from '@/utils/auth'
import {getInfo, login} from '@/api/user'
import Vue from 'vue'
import {ACCESS_TOKEN} from '@/store/mutation-types'

const state = {
  token: getToken(),
  ID: '',
  name: '',
  welcome: '',
  avatar: '',
  roles: [],
  info: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, {name, welcome}) => {
    state.name = name;
    state.welcome = welcome;
  },
  SET_ID: (state, ID) => {
    state.ID = ID;
  },

  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  },
  REMOVE_TOKEN: (state) => {
    state.token = '';
  }
};

const actions = {
  //user login,，没有后台api
  login({commit} , userInfo) {
    const {username , password} = userInfo
    debugger
    return new Promise((resolve , reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const data = response
        console.log(data.token)
        commit('SET_TOKEN' , data.token)
        setToken(data.token)
        resolve()
        debugger
      }).catch(error => {
        debugger
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        debugger
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({commit}, token) {
    return new Promise((resolve,reject) => {
      commit('SET_TOKEN' , '')
      commit('SET_ROLES' , [])
      Vue.ls.remove(ACCESS_TOKEN)
      Vue.ls.remove('testUserInfo')
      resolve()
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
