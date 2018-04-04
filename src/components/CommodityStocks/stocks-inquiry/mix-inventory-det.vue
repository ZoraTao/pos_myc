<template>
  <div>
    <el-table
      :data="codeStockData"
      size="small"
      stripe
      max-height="400"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%;">
      <el-table-column
        prop="classCode"
        label="类别代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="className"
        label="类别名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="brandCode"
        label="品牌代码">
      </el-table-column>
      <el-table-column
        prop="brandName"
        label="品牌名称">
      </el-table-column>
      <el-table-column
        prop="varietyCode"
        label="品种代码">
      </el-table-column>
      <el-table-column
        prop="varietyName"
        label="品种名称">
      </el-table-column>
      <el-table-column
        prop="sku"
        label="商品编码">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="商品名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="validity"
        label="有效期">
      </el-table-column>
      <el-table-column
        prop="batchNo"
        label="批号">
      </el-table-column>
      <el-table-column
        prop="registerCode"
        label="注册证号">
      </el-table-column>
      <el-table-column
        prop="batchCode"
        label="批次码">
      </el-table-column>
      <el-table-column
        prop="costType"
        label="结算方式">
      </el-table-column>
      <el-table-column
        prop="batchCode"
        label="赎期天数">
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="条码">
      </el-table-column>
      <el-table-column
        prop="batchCode"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="totalCount"
        label="库存数量">
      </el-table-column>
      <el-table-column
        prop="avgPrice"
        label="不含税零售均价">
      </el-table-column>
      <el-table-column
        prop="avgTaxPrice"
        label="含税零售均价">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="不含税零售价合计">
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
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:page-size="15"-->
        <!--layout="total, prev, pager, next"-->
        <!--:total="10">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "mix-inventory-det",
    components: {},
    props: ['codeStockData'],
    data() {
      return {

      }
    },
    methods: {
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //合计
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index <= 15) {
            sums[index] = '--';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = ' ';
          }
        });
        return sums;
      }
    }
  }
</script>

<style lang="scss">
  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
    font-weight: bold !important;
    font-size: 14px;
  }
</style>
