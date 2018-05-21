<template>
  <div>
    <el-table
        :data="tableData"
        stripe
        size="small"
        align="left"
        style="width: 100%">
        <el-table-column
          prop="warehouseCheckCode"
          label="盘点单号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="initCheckTime"
          label="盘点时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="warehouseName"
          label="盘点仓库"
          width="150">
        </el-table-column>
        <el-table-column
          prop="checkUserName"
          label="盘点人">
        </el-table-column>
        <el-table-column
          prop="warehouseCheckTypeName"
          label="盘点单类型"
          width="120">
        </el-table-column>
        <el-table-column
          label="盘前数"
          width="150">
          <template slot-scope="scope">
            <span>600</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实盘数">
          <template slot-scope="scope">
            <span>600</span>
          </template>
        </el-table-column>
        <el-table-column
          label="差异数">
          <template slot-scope="scope">
            <p class="am-ft-red">-5</p>
          </template>
        </el-table-column>
          <el-table-column
          label="状态">
          <template slot-scope="scope">
            <p class="am-ft-orange">待处理</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click="goCheck(scope.row)">继续处理</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          class="am-ft-right mgt10"
          layout=" prev, pager, next" 
          :page-size="size"
          :total="count"
          :current-page.sync="nub"
          @current-change="requestOrder" >
        </el-pagination>
  </div>
</template>

<script>
  export default {
      name:'notHandle',
      data(){
        return{
          tableData:[],
          nub:1,
          size:10,
          count:0,
        }
      },methods:{
        goCheck(data){
          
        },
        requestOrder(id){
          if(!id){
            id = 0;
          }
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouseCheck/getWarehouseCheckList',
          data:{
            status:id,
            nub: _this.nub == 1 ?'0':(_this.nub-1)*10,
            size: _this.size,
          },
          success:function(res){
              if(res.code == 1){
                _this.count = res.data.count;
                _this.tableData = res.data.list;
              }
          },error:function(err){
              _this.$message({
                message:err,
                type:'error',
                showClose:true
              })
          }
        })
      }
      }
  }
</script>

<style scoped lang="scss">
@import '../../../reset.scss';

</style>