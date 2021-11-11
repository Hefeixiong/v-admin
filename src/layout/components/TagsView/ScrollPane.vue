<template>

  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot/>

  </el-scrollbar>
</template>

<script>

const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: 'ScrollPane',
  computed: {
    scrollWrapper() {
      //this is  tagsView's wrap (整个包裹)
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  methods: {
    moveToTarget(currentTag) {
      //this.$refs   包括当前组件的所有ref引用对象
      //this.$parent 返回父组件实例
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth; // container width
      const $scrollWrapper = this.scrollWrapper;
      //获取所有的tag
      const tagList = this.$parent.$refs.tag;
      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;

      } else if (lastTag === currentTag) {

        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
  }
};
</script>

<style lang="scss" scoped>

.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}

</style>