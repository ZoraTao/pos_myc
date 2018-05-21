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
        prop="warehouseCheckTypeName"
        label="盘点单类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="initCheckTime"
        label="计划盘点时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="warehouseName"
        label="盘点仓库">
      </el-table-column>
      <el-table-column
        prop="checkUserName"
        label="盘点人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="制单时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="制单人">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
         <p class="am-ft-orange">{{scope.row.statusName}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="goCheck(scope.row)">查看盘点详情</a>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      class="am-ft-right mgt10"
      layout=" prev, pager, next" 
      @current-change="requestOrder"
      :page-size="pageSize"
      :total="listCounts"
      :current-page.sync="nub">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "check-ed",
    component: {},
    data() {
      return {
        pageSize:10,
        size:10,
        tableData: [],
        listCounts:0,
        nub:1,
      }
    },
    props:{
      selectBase:{
        type:String,
        default:''
      },
      check:{
        type:Boolean,
        defalut:false
      }
    },
    methods: {
      requestOrder(){
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouseCheck/getWarehouseCheckList',
          data:{
            warehouseId:_this.selectBase,
            flag:_this.check?'1':'',
            status:2,
            nub:_this.nub == 1?'0':_this.nub*_this.size,
            size:10,
          },
          success:function(res){
              if(res.code == 1){
                _this.listCounts = res.data.count;
                _this.tableData = res.data.list;
              }
          },error:function(err){

          }
        })
      },
      //开始盘点
      goCheck(data){
        this.$router.push({
          name: 'check-inventory',
          query: {id:data.warehouseCheckCode},
          params:{data: data}
        })
      }
    }
  }
</script>

<style scoped>

</style>
