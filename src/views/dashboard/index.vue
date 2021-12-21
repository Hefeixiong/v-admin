<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <div class="text item">
      头像：<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" alt="">
    </div>
    <div class="text item">
      用户名：{{ name }}
    </div>
    <div class="text item">
      权限：{{ roles }}
    </div>
    <div class="text item">
      token：{{ token }}
    </div>
  </el-card>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'avatar',
      'token'
    ])
  }
}
</script>

<style lang="scss" scoped>
.box-card {
    margin: 30px;
   .user-avatar {
    height: 64px;
    width: 64px;
  }
  .text {
    border-color: #7d7d7f ;
    padding-top: 6px;
  }
  }



</style>
