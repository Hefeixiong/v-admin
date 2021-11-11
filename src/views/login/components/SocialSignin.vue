<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandClick">
      <span class="wx-svg-container"></span>
      Wechat
    </div>
    <div class="sign-btn" @click="tencentHandClick">
      <span class="qq-svg-container"></span>
      QQ
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialSignin',
  methods: {
    wechatHandClick(thirdpart) {
      alert('ok')
    },
    tencentHandClick(thirdpart) {
      alert('ok')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>