<template>
    <main>
      <header>
          <LayoutNav></LayoutNav>
      </header>
      <article class="mg10">
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
.mg10{
  margin: 10px;
}
</style>
