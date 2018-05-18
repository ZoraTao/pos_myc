<template>
  <div>
    <el-table
      :data="totalStocksData"
      size="small"
      stripe
      max-height="400"
      show-summary
      style="width: 100%;">
      <el-table-column
        prop="className"
        label="类别"
        width="130">
      </el-table-column>
      <el-table-column
        prop="totalCount"
        label="库存数量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="avgPrice"
        label="不含税零售均价"
        width="120">
      </el-table-column>
      <el-table-column
        prop="avgTaxPrice"
        label="含税零售均价"
        width="120">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="不含税零售价合计"
        width="150">
      </el-table-column>
      <el-table-column
        prop="totalTaxPrice"
        label="含税零售价合计">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: "total-inventory",
    components: {},
    props: ['totalStocksData'],
    created: function() {

    },
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .el-table__footer-wrapper tbody td,.el-table__header-wrapper tbody td {
    font-weight: bold !important;
    font-size: 14px;
  }
</style>
