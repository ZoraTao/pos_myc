<template>
  <div>
    <el-table
      v-loading="loading"
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
    <!--分页-->
    <!--<div class="block mgt10">-->
      <!--<el-pagination-->
        <!--class="am-ft-right"-->
        <!--background-->
        <!--@current-change="handleCurrentChange"-->
        <!--:page-size="10"-->
        <!--layout="total, prev, pager, next"-->
        <!--:total="totalStocksData.count"-->
        <!--:current-page.sync="nub">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "total-inventory",
    components: {},
    props: ['totalStocksData'],
    created: function() {
      this.closeLoading();
    },
    data() {
      return {
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: 0,//总条数
        loading: true
      }
    },
    methods: {
      closeLoading(){
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      //分页
      handleCurrentChange(val) {
        this.nub = (`${val}`-1) * this.size;
      },
    }
  }
</script>

<style lang="scss">
  .el-table__footer-wrapper tbody td,.el-table__header-wrapper tbody td {
    font-weight: bold !important;
    font-size: 14px;
  }
</style>
