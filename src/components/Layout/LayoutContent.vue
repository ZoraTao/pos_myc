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
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'
import store from 'vuex'
export default {
  name: 'LayoutContent',
  data () {
    return {}
  },
  components:{
    LayoutNav
  },
  computed:{
    ...mapGetters([
      ]),
      ...mapState([
      ])
      
  },
  methods:{
    ...mapMutations([
    ]),
    ...mapActions([
    ])
  }
}
</script>

<style scoped lang="scss">
.mg10{
  margin: 10px;
}
</style>
