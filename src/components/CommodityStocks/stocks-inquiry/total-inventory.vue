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
        label="类别"
        width="130">
      </el-table-column>
      <el-table-column
        prop="b"
        label="库存数量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="c"
        label="不含税零售均价"
        width="120">
      </el-table-column>
      <el-table-column
        prop="d"
        label="含税零售均价"
        width="120">
      </el-table-column>
      <el-table-column
        prop="e"
        label="不含税零售价合计"
        width="150">
      </el-table-column>
      <el-table-column
        prop="f"
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
    name: "total-inventory",
    components: {},
    data() {
      return {
        tableData6: [{
          a: '隐形眼镜辅助产品',
          b: `1093`,
          c: `5378.4`,
          d: `5378.4`,
          e: `75671.0`,
          f: `45676.0`
        },
          {
            a: '镜片',
            b: `505`,
            c: `521.4`,
            d: `521.4`,
            e: `6491.0`,
            f: `6491.0`
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
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 2 || index === 3) {
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
            sums[index] = 'N/A';
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
