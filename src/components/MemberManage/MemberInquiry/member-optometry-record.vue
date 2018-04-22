<template>
  <div>
    <optometryOrderList :memberDet="'detail'" :memberInfos="memberBaseInfo"></optometryOrderList>
  </div>
</template>

<script>
  import optometryOrderList from '../../Bills/optometryOrder/optometryOrderList/optometry-order-list'

  export default {
    name: "member-optometry-record",
    components: {
      optometryOrderList
    },
    data() {
      return {
        memberInfo: ''
      }
    },
    created: function () {

    },
    props: ['memberBaseInfo'],
    methods: {

    },mounted(){
      // console.log(1,this.memberBaseInfo)
    }
  }
</script>

<style scoped>
  .content_box{
    padding: 0 !important;
  }
</style>
