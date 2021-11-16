import {getToken, setToken} from '@/utils/auth'
import {getInfo, login} from '@/api/user'
import Vue from 'vue'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {welcome} from '@/utils/util'

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
    return new Promise((resolve , reject) => {
      login({username: username.trim(), password: password}).then(response => {
        const {data} = response
        commit('SET_TOKEN' , data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //test
  testLogin({commit}) {
    return new Promise((resolve => {
      Vue.ls.set(
        ACCESS_TOKEN,
        '830b6b9c-a4f1-4532-aad3-6289ca914693',
      );
      commit('SET_TOKEN' , '830b6b9c-a4f1-4532-aad3-6289ca914693');
      resolve()
    }))
  },
  GetInfo({commit}) {
    return new Promise((resolve, reject) => {
      if(process.env.VUE_APP_MODE !== 'production' ){
        const data = {
          'user_id': '376227121210661',
          'name': '闫冰',
          'avatar': '',
          'mobile': '18641691067',
          'roles': [
            470672300,
            'ops'
          ],
          'department': [
            106884391,
            143606932
          ]
        }
        const roles = data.roles
        // 由于钉钉未设置头像，返回空值
        !data.avatar &&
        (data.avatar =
          'https://sc2.hexiaoxiang.com/common/miniApp/image/vip/avatarDefault.png')
        commit('SET_ROLES', roles)
        commit('SET_INFO', data)
        commit('SET_NAME', { name: data.name, welcome: welcome() })
        commit('SET_AVATAR', data.avatar)
        commit('SET_TOKEN', '830b6b9c-a4f1-4532-aad3-6289ca914693',);


        resolve(data)
      } else {
        getInfo({}).request()
          .then(response => {
            console.log("getInfo");
            const {data} = response;
            commit('SET_ID', data.ID);
            commit('SET_AVATAR', data.avatar);
            commit('SET_NAME', data.name);
            commit('SET_ROLES', data.roles);

            resolve(response);
          })
          .catch(error => reject(error));
      }
    });
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