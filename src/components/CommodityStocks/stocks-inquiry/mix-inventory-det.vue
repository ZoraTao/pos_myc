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
        prop="redemptionPeriod"
        label="赎期天数">
      </el-table-column>
      <el-table-column
        prop="barcode"
        label="条码">
      </el-table-column>
      <el-table-column
        prop="orgName"
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
    <div class="block mgt10">
      <el-pagination
        class="am-ft-right"
        background
        @current-change="handleCurrentChange"
        :page-size="15"
        layout="total, prev, pager, next"
        :total="counts"
        :current-page.sync="nub">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mix-inventory-det",
    components: {},
    props: ['formInline','categoryLevelInfo'],
    data() {
      return {
        codeStockData: [],
        nub: 0,//起始条数
        size: 2,//每页显示数据条数
        counts: 0,//总条数-库存明细类别数量
        loading: true
      }
    },
    created(){

    },
    methods: {
      closeLoading(){
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      //查询库存明细--编码列表
      getCodeStockList(){
        var that = this;
        let setData = that.formInline;
        setData.size = that.size;
        setData.nub = that.nub;

        setData.categoryCode = [that.categoryLevelInfo.category1,that.categoryLevelInfo.category2,that.categoryLevelInfo.category3];
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getCodeStockList',
          method: 'post',
          params: {
            jsonObject: that.formInline,
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
              // console.info(response.data.data)
              that.codeStockData = response.data.data.list;
              that.codeStockCount = parseInt(response.data.data.count);
              that.closeLoading();
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
        this.nub = (`${val}`-1) * this.size;
        this.getCodeStockList();
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
