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
      return {
        routeData:[{
          name: '首页',
          path: '',
          isActive: true
        }]
      }
    },
    components: {
      LayoutTop
    },
    // beforeRouteUpdate (to, from, next) {
    //   var hasRoute=false;
    //   this.routeData.forEach(function(element) {
    //     element.isActive=false;
    //     if(element.path==to.path){
    //       element.isActive=true;
    //       hasRoute=true;
    //       return true;
    //     }else{
    //       hasRoute=false;
    //     }
    //   });
    //   console.log(hasRoute)
    //   if(hasRoute==false){
    //     this.routeData.push({
    //       name: to.path.name,
    //       path: to.path,
    //       isActive: true
    //     });
    //   }
    //   next();
    //   console.log(this.routeData)
    // }
  }
</script>

<style scoped lang="scss">
  .layoutBody{
    width: 100%;
    height: 100%;
  }
</style>
