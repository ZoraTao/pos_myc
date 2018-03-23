<template>
  <div>
    <el-table
      :data="tableData6"
      size="small"
      stripe
      :summary-method="getSummaries"
      show-summary
      style="width: 100%;">
      <el-table-column
        prop="a"
        label="类别代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="b"
        label="类别名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="c"
        label="品牌代码">
      </el-table-column>
      <el-table-column
        prop="d"
        label="品牌名称">
      </el-table-column>
      <el-table-column
        prop="e"
        label="品种代码">
      </el-table-column>
      <el-table-column
        prop="f"
        label="品种名称">
      </el-table-column>
      <el-table-column
        prop="g"
        label="商品编码">
      </el-table-column>
      <el-table-column
        prop="h"
        label="商品名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="i"
        label="有效期">
      </el-table-column>
      <el-table-column
        prop="j"
        label="批号">
      </el-table-column>
      <el-table-column
        prop="k"
        label="注册证号">
      </el-table-column>
      <el-table-column
        prop="l"
        label="批次码">
      </el-table-column>
      <el-table-column
        prop="m"
        label="结算方式">
      </el-table-column>
      <el-table-column
        prop="n"
        label="赎期天数">
      </el-table-column>
      <el-table-column
        prop="o"
        label="条码">
      </el-table-column>
      <el-table-column
        prop="p"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="q"
        label="库存数量">
      </el-table-column>
      <el-table-column
        prop="r"
        label="不含税零售均价">
      </el-table-column>
      <el-table-column
        prop="s"
        label="含税零售均价">
      </el-table-column>
      <el-table-column
        prop="t"
        label="不含税零售价合计">
      </el-table-column>
      <el-table-column
        prop="u"
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
        :total="10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mix-inventory-det",
    components: {},
    data() {
      return {
        tableData6: [{
          a: 'PL1230001',
          b: '镜架',
          c: 'PP1230001',
          d: '卡尔丹尼',
          e: 'gxj',
          f: '光学架',
          g: 'BM12340001',
          h: '卡尔丹尼光学架（配镜盒）691-6062',
          i: '2017-09-21',
          j: '20161234',
          k: '10000000001',
          l: '10000000001',
          m: '现金',
          n: ' ',
          o: ' ',
          p: ' ',
          q: ' ',
          r: ' ',
          s: ' ',
          t: ' ',
          u: ' ',
        }]
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
          if (index === 1 ) {
            sums[index] = ' ';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          // if (!values.every(value => isNaN(value))) {
          //   sums[index] = values.reduce((prev, curr) => {
          //     const value = Number(curr);
          //     if (!isNaN(value)) {
          //       return prev + curr;
          //     } else {
          //       return prev;
          //     }
          //   }, 0);
          // } else {
          //   sums[index] = ' ';
          // }
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
