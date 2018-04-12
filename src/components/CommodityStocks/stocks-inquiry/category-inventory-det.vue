<template>
  <div>
    <el-table
      v-for="(tableData,index) in categoryData"
      :key="tableData.className"
      v-if="counts!=0"
      :data="tableData"
      size="small"
      stripe
      max-height="260"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%;">
      <el-table-column
        prop="className"
        label="类别"
        width="130">
      </el-table-column>
      <el-table-column
        prop="brandName"
        label="品牌"
        width="100">
      </el-table-column>
      <el-table-column
        prop="varietyName"
        label="品种"
        width="120">
      </el-table-column>
      <el-table-column
        prop="totalCount"
        label="库存数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="avgPrice"
        label="不含税零售价均价"
        width="150">
      </el-table-column>
      <el-table-column
        prop="avgTaxPrice"
        label="含税零售价均价"
        width="200">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="不含税零售价合计"
        width="200">
      </el-table-column>
      <el-table-column
        prop="totalTaxPrice"
        label="含税零售价合计">
      </el-table-column>
    </el-table>

    <!--总合计-->
    <div class="in-total">
      <strong>合计</strong>
      <strong style="margin-left: 319px;">{{totalCount}}</strong>
      <strong style="margin-left: 436px;">{{totalPrice}}</strong>
      <strong style="margin-left: 164px;">{{totalTaxPrice}}</strong>
    </div>

    <!--分页-->
    <div class="block mgt10">
      <el-pagination
        class="am-ft-right"
        background
        @current-change="handleCurrentChange"
        :page-size="2"
        layout="total, prev, pager, next"
        :total="counts"
        :current-page.sync="nub">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "category-inventory-det",
    components: {},
    props: ['formInline'],
    data() {
      return {
        nub: 0,//起始条数
        size: 2,//每页显示数据条数
        counts: 0,//总条数-库存明细类别数量
        categoryData: [],//库存明细类别列表
        totalCount: '',//库存总计
        totalPrice: '',//不含税零售价合计
        totalTaxPrice: '',//含税零售价合
      }
    },
    created() {

    },
    methods: {
      //查询库存明细--类别列表
      getCategoryInventory() {
        var that = this;
        let setData = that.formInline;
        setData.size = that.size;
        setData.nub = that.nub;

        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getClassStockList',
          method: 'post',
          params: {
            jsonObject: setData,
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              console.info(response.data.data)
              that.categoryData = response.data.data.list;
              that.counts = parseInt(response.data.data.count);
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //总合计
      getSum() {
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getStockCount',
          method: 'post',
          params: {
            jsonObject:  that.formInline,
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              // console.info(response.data.data);
              that.totalCount = response.data.data.totalCount;
              that.totalPrice = response.data.data.totalPrice;
              that.totalTaxPrice = response.data.data.totalTaxPrice;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //分页
      handleCurrentChange(val) {
        this.nub = (`${val}` - 1) * this.size;
        this.getCategoryInventory();
      },
      //合计
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '小计';
            return;
          }
          if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 ) {
            sums[index] = '';
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

  .in-total {
    width: 100%;
    line-height: 26px;
    font-size: 14px;
    padding: 0 10px;
    margin-top: 10px;
    overflow: hidden;
  }
</style>
