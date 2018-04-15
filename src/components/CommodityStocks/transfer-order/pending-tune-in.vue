<template>
  <div>
    <el-table
      :data="listData"
      stripe
      size="small"
      align="left"
      style="width: 100%">
      <el-table-column
        prop="requisitionNo"
        label="调拨单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sourceType"
        label="来源类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="requisitionOrgName"
        label="调拨部门">
      </el-table-column>
      <el-table-column
        prop="outWarehName"
        label="调出仓库">
      </el-table-column>
      <el-table-column
        prop="inWarehName"
        label="调入仓库">
      </el-table-column>
      <el-table-column
        prop="makingP"
        label="制单人">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="制单日期"
        width="140">
      </el-table-column>
      <el-table-column
        label="调拨单状态">
        <template slot-scope="scope">
          <p class="am-ft-orange">{{scope.row.statusName}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="goDetail(scope.$index,scope.row)">查看详情</a>
          <a href="javascript:;" class="mgl20" @click="checkIn(scope.$index,scope.row)">调入接收</a>
        </template>
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
        :total="listCounts"
        :current-page.sync="nub">
      </el-pagination>
    </div>

    <!--立即调入弹窗-->
    <el-dialog class="comen-dialog" title="调入接收" :visible.sync="openCheckIn" width="870px">
      <div class="dialog-body">
        <div class="dialog-top">
          <strong class="fn-left"><em>调拨单号：</em>{{requisitionNo}}</strong>
        </div>
        <el-table
          :data="proList"
          stripe
          max-height="360"
          style="width: 100%">
          <el-table-column
            prop="sku"
            label="商品编码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="skuName"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            label="调入数量">
            <template slot-scope="scope">
              <span>0</span>
            </template>
          </el-table-column>
          <el-table-column
            label="实物码">
            <template slot-scope="scope">
              <span>无实物码调拨</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openCheckIn = false">取 消</el-button>
        <el-button type="primary" @click="innerRequisition">确认接收</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "pending-tune-in",
    component: {},
    data() {
      return {
        ueserId: '',
        ueserOrgId: '',
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: this.listCounts,//总条数
        proList: [],
        requisitionId: '',//调拨单id
        requisitionNo: '',//调拨单号
        openCheckIn: false,
        checked: true
      }
    },
    props: ['listData','listCounts', 'mypagination'],
    created() {
      const ueserInfo = JSON.parse(localStorage.getItem("userData"));
      this.ueserId = ueserInfo.userId;
      this.ueserOrgId = ueserInfo.orgId;
    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.nub = (`${val}`-1) * this.size;
        this.mypagination(this.nub);
      },
      //查看详情
      goDetail(index,data) {
        this.$router.push({
          path: '/commodity/transfer-order-detail',
          name: 'transfer-order-detail',
          params: data
        })
      },
      //立即调出弹窗
      checkIn(index,data) {
        const that = this;
        that.openCheckIn = true;
        that.requisitionId = data.requisitionId;
        that.requisitionNo = data.requisitionNo;
        that.getDRequisition();
      },
      //获取子商品信息
      getDRequisition(){
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/dRequisition/getDRequisition',
          method: 'post',
          params: {
            jsonObject: {
              requisitionId: that.requisitionId
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
              that.proList = response.data.data.detailList;
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
      //接收调拨单
      innerRequisition(){
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/dRequisition/innerRequisition',
          method: 'post',
          params: {
            jsonObject: {
              requisitionId: that.requisitionId
            },
            keyParams: {
              weChat: true,
              orgId: that.ueserOrgId,
              userId: that.ueserId
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
              that.$message({
                showClose: true,
                message: '接收成功！',
                type: 'success'
              });
              that.openCheckIn = false;
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

<style lang="scss">
  @import "../../../reset";
  .comen-dialog{
    .el-table th{
      background-color: transparent !important;
    }
    .el-table td, .el-table th {
      padding: 6px 0 !important;
      font-size: 12px;
    }
    .dialog-body{
      padding: 10px 20px;
      .dialog-top{
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px dashed #E1E1E1;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        em{
          font-size: 12px;
          color: #555555;
        }
      }
      .el-checkbox__label{
        font-size: 12px !important;
      }
    }
    .el-dialog__footer{
      background-color: #EEEEEE !important;
    }
  }
</style>
