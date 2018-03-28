<template>
  <div>
    <optometryOrderCu :memberDet="'detail'" :memberInfo="memberBaseInfo"></optometryOrderCu>
  </div>
</template>

<script>
  import optometryOrderCu from '../../Bills/optometryOrder/optometryOrderCu/optometry-order-cu'

  export default {
    name: "member-optometry-record",
    components: {
      optometryOrderCu
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

    }
  }
</script>

<style scoped>

</style>
