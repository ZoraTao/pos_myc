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
        let setData = _this.formInline;
        setData.size = _this.size;
        setData.nub = _this.nub;
        setData.categoryCode = [_this.categoryLevelInfo.category1,_this.categoryLevelInfo.category2,_this.categoryLevelInfo.category3];
        const _this = this;
        _this.$myAjax({
          url:'pos-api/stock/getVarietyStockList',
          data:setData,
          success:function(res){
            if(res.code == 1){
               _this.varietyDetData = res.data.list;
              _this.counts = parseInt(res.data.count);
              _this.closeLoading();
            }else{
              _this.$message({
                type:'warning',
                message:res.msg,
                showClose:true})
             }
          },error:function(err){
             _this.$message({
              type:'error',
               message:err,
              showClose:true
            })
          }
        });
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
