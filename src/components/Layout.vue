<template>
    <header>
        <LayoutTop></LayoutTop>
        <LayoutNav></LayoutNav>
    </header>
</template>

<script>
import LayoutTop from './LayoutTop.vue'
import LayoutNav from './LayoutNav.vue'

export default {
  name: 'Layout',
  data () {
    return { }
  },
  components:{
    LayoutTop,
    LayoutNav,
  }
}
</script>

<style scoped lang="scss">
</style>
