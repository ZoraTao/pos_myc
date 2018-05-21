<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="selectData" class="demo-form-inline am-ft-left">
        <el-col :span="20">
          <el-form-item label="盘点日期：">
            <div class="fn-line-block">
              <el-date-picker 
              type="date" 
              placeholder="选择日期" 
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="selectData.startTime"
              style="width: 125px;"></el-date-picker>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">至</div>
            <div class="fn-line-block">
              <el-date-picker 
              type="date" 
              placeholder="选择日期" 
              v-model="selectData.endTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 125px;"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="盘点部门：">
            <el-select v-model="selectData.department" placeholder="请选择" style="width: 130px">
              <el-option 
              v-for="item in orgList"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="盘点仓库：">
            <el-select v-model="selectData.base" placeholder="请选择" style="width: 130px">
              <el-option 
              v-for="item in baseList"
              :key="item.warehouseId"
              :label="item.warehouseName"
              :value="item.warehouseId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="requestOrder()">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="fn-right mgr20">
          <el-button type="primary" @click="goAdd">+&nbsp;添加盘点单</el-button>
        </el-col>
      </el-form>
    </el-row>
    <!--content-->
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <h2 class="am-ft-16 mgb15">查询结果 ({{count}})</h2>
      </el-col>
      <el-col :span="24">
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
          label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" @click="goCheck(scope.row)">查看详情</a>
          </template>
        </el-table-column>
      </el-table>
          <!--分页-->
       <el-pagination
          background
          class="am-ft-right mgt10"
          layout=" prev, pager, next" 
          :page-size="size"
          :total="count"
          :current-page.sync="nub"
          @current-change="requestOrder" >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "inventory-check-temporary",
    components: {},
    data() {
      return {
        input1: '',
        size:10,
        nub:1,
        selectData: {
          department: '',
          base:'',
          _check: false,
          startTime: '',
          endTime: ''
        },
        count:0,
        tableData: [],
        baseList:[],
        orgList:[],
      }
    },
    methods: {
      requestOrder(id){
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouseCheck/getWarehouseCheckList',
          data:{
            status:'-1',
            checkStart:_this.selectData.startTime,
            checkEnd:_this.selectData.endTime,
            warehouseId:_this.selectData.base,//仓库ID
            orgId:_this.selectData.department,
            nub: _this.nub == 1?'0':(_this.nub-1)*_this.size,
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
      },
      initList(){
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouse/getWarehouseList',
          data:{},
          success:function(res){
            if(res.code == 1){
                _this.baseList = res.data.list;
            }
          },error:function(err){
            _this.$message({
              showClose: true,
              message: err,
              type: "error"
            })
          }
        })
        _this.$myAjax({
          url:'pos-api/shopBy/getShopByList',
          data:{},
          success:function(res){
            if(res.code == 1){
              _this.orgList = res.data.shopByList;
            }
          },error:function(err){
            _this.$message({
              showClose: true,
              message: err,
              type: "error"
            })
          }
        })
      },
      onSubmit() {
        console.log('submit!');
      },
      goAdd(){
        this.$router.push({
          path: '/commodity/add-temporary',
          name: 'add-temporary-inventory',
          params: {}
        })
      }
    },created(){
      this.initList();
      this.requestOrder();
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
</style>
