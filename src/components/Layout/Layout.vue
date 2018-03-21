<template>
  <div class="">
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
</style>
