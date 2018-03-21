<template>
    <main>
      <header>
          <LayoutNav></LayoutNav>
      </header>
      <article>
          <router-view></router-view>
      </article>
    </main>
</template>

<script>
import LayoutNav from './LayoutNav.vue'

export default {
  name: 'LayoutContent',
  data () {
    return {}
  },
  components:{
    LayoutNav
  }
}
</script>

<style scoped lang="scss">
</style>
