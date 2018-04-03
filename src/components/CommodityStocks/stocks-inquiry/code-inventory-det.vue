<template>
  <div>
    <el-table
      :data="codeStockData"
      size="small"
      stripe
      :summary-method="getSummaries"
      show-summary
      style="width: 100%;">
      <el-table-column
        prop="className"
        label="类别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="brandName"
        label="品牌"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sku"
        label="商品编码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="库存数量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="可分配数"
        width="80">
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
    <div class="block mgt10">
      <el-pagination
        class="am-ft-right"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="15"
        layout="total, prev, pager, next"
        :total="codeStockData.count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "code-inventory-det",
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
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1 || index === 2 || index === 3 || index === 6 || index === 7) {
            sums[index] = ' ';
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
  .el-table__footer-wrapper tbody td,.el-table__header-wrapper tbody td {
    font-weight: bold !important;
    font-size: 14px;
  }
</style>
