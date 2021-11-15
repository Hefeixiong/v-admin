<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <button @click="getInfo">userinfo</button>
    <button @click="addSidebar">动态添加侧边栏</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import router from '@/router';
import Layout from '@/layout';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    getInfo() {
      console.log(this.$store.state.user);

    },
    addSidebar() {
      let r1 = [
        {
          path: '/form',
          component: Layout,
          meta: {title: 'Form', icon: 'form', roles: ['ops']},
          children: [
            {
              path: 'index',
              name: 'Form',
              component: () => import('@/views/form/index'),
              meta: {title: 'Form', icon: 'form', roles: ['ops']}
            }
          ]
        }];
      router.addRoutes(r1);

    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
