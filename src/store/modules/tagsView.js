const state = {
  visitedViews: [],
  cachedViews: []
};

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return;
    // const {id = 100} = view.query;
    state.visitedViews.push(Object.assign({}, view, {
      title: view.name === 'studentDetail' ? view.meta.title.slice(0, 2) : (view.meta.title || 'no-name')
      // title: view.name === 'studentDetail' ? view.meta.title.slice(0, 2) + id : (view.meta.title || 'no-name')
    }));
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      //保存view.name 到 cachedViews
      state.cachedViews.push(view.name);
    }
  },
  TEST: (state, view) => {
    console.log(view);
  },
  DEL_VISITED_VIEW: (state, view) => {
    console.log(view);
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
};


const actions = {
  addView({dispatch}, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView({commit}, view) {
    commit('ADD_VISITED_VIEW', view);
  },
  addCachedView({commit}, view) {
    commit('ADD_CACHED_VIEW', view);
  },
  logView({commit}, view) {
    commit('TEST', view);
  },
  delView({dispatch, state}, view) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view);
      // dispatch('delCachedView', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });

    });
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({commit, state}, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};