<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-col :span="20">
          <el-form-item label="调拨单号：">
            <el-input placeholder="输入商品编码" v-model="formInline.requisitionNo" style="width: 130px"></el-input>
          </el-form-item>
          <el-form-item label="调拨部门：">
            <el-select v-model="formInline.requisitionOrg" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="i in requisitionOrg"
                :key="i.shopId"
                :label="i.shopName"
                :value="i.shopId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出仓库：">
            <el-select v-model="formInline.outWarehId" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="i in warehList"
                :key="i.warehouseId"
                :label="i.warehouseName"
                :value="i.warehouseId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调入仓库：">
            <el-select v-model="formInline.inWarehId" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="n in warehList"
                :key="n.warehouseId"
                :label="n.warehouseName"
                :value="n.warehouseId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="调拨日期：">
            <div class="fn-line-block">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.requisitionTimeStart" value-format="yyyy-MM-dd"
                              style="width: 125px;"></el-date-picker>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">至</div>
            <div class="fn-line-block">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.requisitionTimeEnd" value-format="yyyy-MM-dd"
                              style="width: 125px;"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="来源类型：">
            <el-select v-model="formInline.sourceType" placeholder="请选择" style="width: 130px">
              <el-option
                v-for="i in sourceType"
                :key="i.code"
                :label="i.name"
                :value="i.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="fn-right mgr20">
          <el-button type="primary" @click="goAdd">+&nbsp;新增调拨单</el-button>
        </el-col>
      </el-form>
    </el-row>
    <!--content-->
    <el-row class="mgt10">
      <el-col :span="24" class="pl10">
        <h2 class="am-ft-16 mgb15">查询结果 ({{counts}})</h2>
      </el-col>
      <!--tab-->
      <el-col :span="24">
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane label="调拨待审核" name="1">
            <pending-review :listData="dRequisitionList" :listCounts="counts" :mypagination="pagination"></pending-review>
          </el-tab-pane>
          <el-tab-pane label="待调出" name="2">
            <pending-tune-out :listData="dRequisitionList" :listCounts="counts" :mypagination="pagination"></pending-tune-out>
          </el-tab-pane>
          <el-tab-pane label="待调入" name="3">
            <pending-tune-in :listData="dRequisitionList" :listCounts="counts" :mypagination="pagination"></pending-tune-in>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="4">
            <completed-lists :listData="dRequisitionList" :listCounts="counts" :mypagination="pagination"></completed-lists>
          </el-tab-pane>
          <el-tab-pane label="全部" name="5">
            <all-lists :listData="dRequisitionList" :listCounts="counts" :mypagination="pagination"></all-lists>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PendingReview from './pending-review'
  import PendingTuneOut from './pending-tune-out'
  import PendingTuneIn from './pending-tune-in'
  import CompletedLists from './completed-lists'
  import AllLists from './all-lists'

  export default {
    name: "transfer-order-index",
    components: {
      PendingReview,
      PendingTuneOut,
      PendingTuneIn,
      CompletedLists,
      AllLists
    },
    data() {
      return {
        dRequisitionList: [],//调拨单数据
        requisitionOrg: [],//调拨部门
        sourceType: [],//来源类型
        warehList: [],//仓库列表
        formInline: {
          sourceType: '',//来源类型
          requisitionNo: '',//调拨单编号
          requisitionOrg: '',//调拨部门Id
          outWarehId: '',//调出仓库Id
          inWarehId: '',//调入仓库Id
          requisitionTimeStart: '',//调拨日期始
          requisitionTimeEnd: '',//调拨日期止
          status: '1'
        },
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: 0,//总条数
      }
    },
    created() {
      this.getInquireList();
      this.getRequisitionOrgList();
      this.getSourceType();
      this.getWarehList();
    },
    methods: {
      //分页
      pagination(val) {
        this.getInquireList({nub:val});
      },
      //tab切换
      handleClick(tab, event) {
        if (tab.name == 5) {
          this.getInquireList({status: ''});
        } else {
          this.getInquireList({status: tab.name});
        }
        // console.info(tab.name)
      },
      //筛选调拨单列表
      onSubmit() {
        const that = this;
        // console.log(that.formInline);
        that.getInquireList();
      },
      //新增调拨单
      goAdd() {
        this.$router.push({
          path: '/commodity/transfer-order-add',
          name: 'transfer-order-add',
          params: {}
        })
      },
      //查询调拨单列表
      getInquireList(params) {
        var that = this;
        that.formInline.nub = that.nub;
        that.formInline.size = that.size;
        const newParams = Object.assign(that.formInline, params);
        that.$axios({
          // url: 'http://myc.qineasy.cn/pos-api/dRequisition/getDRequisitionList',
          url: 'http://10.0.17.225:8080/pos-api/dRequisition/getDRequisitionList',
          method: 'post',
          params: {
            jsonObject: newParams,
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
              that.dRequisitionList = response.data.data.list;
              that.counts = response.data.data.count;
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
        this.getInquireList({nub: this.nub});
      },
      //查询调拨部门列表
      getRequisitionOrgList() {
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/shopBy/getShopByList',
          method: 'post',
          params: {
            jsonObject: {},
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
              that.requisitionOrg = response.data.data.shopByList;
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
      //查询仓库列表
      getWarehList() {
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/warehouse/getWarehouseList',
          method: 'post',
          params: {
            jsonObject: {
              status: 0
            },
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
              that.warehList = response.data.data.list;
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
      //查询来源类型列表
      getSourceType() {
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
          method: 'post',
          params: {
            jsonObject: {
              type: 13
            },
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
              that.sourceType = response.data.data.list;
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
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
  @import "../../MemberManage/MemberInquiry/tabs-css";

</style>
