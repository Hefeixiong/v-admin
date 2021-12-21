import {getToken, removeToken, setToken} from '@/utils/auth'
import {getInfo, login} from '@/api/user'
import router, {resetRouter} from '@/router'


const state = {
  token: getToken(),
  name: '',
  ID: '',
  avatar: '',
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ID: (state, ID) => {
    state.ID = ID;
  },

  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
};

const actions = {
  login({commit} , userInfo) {
    const {username , password} = userInfo
    return new Promise((resolve , reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const data = response
        commit('SET_TOKEN' , data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log('get userinfo is',data)
        const { roles, name, avatar, user_id } = data
        // roles must be a non-empty array
        console.log('准备设置roles',roles)
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ID', user_id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

 // user logout
  logout({ commit, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    dispatch('tagsView/delAllViews', null, { root: true })
    removeToken()
  },

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
