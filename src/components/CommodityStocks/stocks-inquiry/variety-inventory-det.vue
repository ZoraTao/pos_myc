<template>
  <div>
    <el-table
      :data="varietyDetData"
      size="small"
      max-height="400"
      stripe
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
        width="150">
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
        prop="totalTaxPrice "
        label="含税零售价合计">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block mgt10">
      <el-pagination
        class="am-ft-right"
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="counts"
        :current-page.sync="nub">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "variety-inventory-det",
    components: {},
    props: ['formInline','categoryLevelInfo'],
    data() {
      return {
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: 0,
        varietyDetData: [],
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
      //查询库存明细--品种列表
      getVarietyDetList(){
        var that = this;
        let setData = that.formInline;
        setData.size = that.size;
        setData.nub = that.nub;
        setData.categoryCode = [that.categoryLevelInfo.category1,that.categoryLevelInfo.category2,that.categoryLevelInfo.category3];

        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getVarietyStockList',
          method: 'post',
          params: {
            jsonObject: setData,
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
              // console.info('品种 '+response.data.data)
              that.varietyDetData = response.data.data.list;
              that.counts = parseInt(response.data.data.count);
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
        this.getVarietyDetList();
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
          if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5) {
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
            sums[index] = '';
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
