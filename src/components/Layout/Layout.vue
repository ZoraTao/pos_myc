<template>
  <div class="layoutBody">
    <LayoutTop></LayoutTop>
    <router-view></router-view>
  </div>
</template>

<script>
import LayoutTop from './LayoutTop.vue'

export default {
  name: 'Layout',
  data () {
    return { }
  },
  components: {
    LayoutTop
  }
}
</script>

<style scoped lang="scss">
.layoutBody{
  width: 100%;
  height: 100%;
}
</style>
