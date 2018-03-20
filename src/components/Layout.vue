<template>
    <main>
      <header>
          <LayoutTop></LayoutTop>
          <LayoutNav></LayoutNav>
      </header>
      <article>
        <LayoutContent></LayoutContent>
      </article>
    </main>
</template>

<script>
import LayoutTop from './LayoutTop.vue'
import LayoutNav from './LayoutNav.vue'
import LayoutContent from './LayoutContent.vue'

export default {
  name: 'Layout',
  data () {
    return { }
  },
  components: {
    LayoutTop,
    LayoutNav,
    LayoutContent
  }
}
</script>

<style scoped lang="scss">
</style>
