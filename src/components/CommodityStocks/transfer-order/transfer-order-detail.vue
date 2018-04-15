<template>
  <div class="content-out-wrapper transfer-wrapper">
    <!--top-->
    <el-row class="inquiry-row top-box mgt20">
      <el-col :span="24" class="titl">
        <h3>调拨单号：{{detailData.requisitionNo}} <span class="am-ft-orange mgl30">{{detailData.statusName}}</span></h3>
        <el-button type="primary" plain @click="goEdit(detailData)">修改</el-button>
      </el-col>

      <el-col :span="24">
          <p>
            <span><em>制单日期：</em>{{detailData.createTime}}</span>
            <span><em>制单人：</em>{{detailData.makingP}}</span>
            <span><em>调拨部门：</em>{{detailData.requisitionOrgName}}</span>
          </p>
        <p>
          <span><em>经办日期：</em>{{detailData.handleTime}}</span>
          <span><em>调拨人：</em>{{detailData.requisitionP}}</span>
          <span><em>调出仓库：</em>{{detailData.outWarehName}}</span>
          <span><em>调入仓库：</em>{{detailData.inWarehName}}</span>
          <span><em>调拨级别：</em>{{detailData.level}}</span>
        </p>
        <p>
          <span><em>承运类型：</em>{{detailData.carrierType}}</span>
          <span><em>承运人：</em>{{detailData.carrierP}}</span>
          <span><em>运费：</em>{{detailData.freight}}</span>
          <span><em>备注：</em>{{detailData.memo}}</span>
        </p>
      </el-col>
    </el-row>
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <h2 class="am-ft-16 mgb15">商品信息</h2>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="detailList"
          stripe
          size="small"
          align="left"
          max-height="300"
          style="width: 100%">
          <el-table-column
            prop="sku"
            label="商品编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="skuName"
            label="商品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            width="50">
          </el-table-column>
          <el-table-column
            prop="registrationNo"
            label="注册证号">
          </el-table-column>
          <el-table-column
            prop="batch"
            label="批次号">
          </el-table-column>
          <el-table-column
            prop="validrtyDate"
            label="有效期">
          </el-table-column>
          <el-table-column
            prop="count"
            label="调拨数量">
          </el-table-column>
          <el-table-column
            label="调出库库存"
            prop="utWarehStk">
          </el-table-column>
          <el-table-column
            label="调入库库存"
            prop="inWaregStk">
          </el-table-column>
          <el-table-column
            label="公司库存"
            prop="allStk">
          </el-table-column>
          <el-table-column
            label="零售价"
            prop="price">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "transfer-order-detail",
    component: {},
    data() {
      return {
        detailData: {},
        requisitionId: '',//调拨单id
        orderDet: {},//详情
        detailList: [],//子商品列表
      }
    },
    created(){
      //调拨单id
      this.requisitionId = this.$route.params.requisitionId;
      this.getDRequisition();
    },
    methods: {
      //修改
      goEdit() {
        this.$router.push({
          path: '/commodity/transfer-order-add',
          name: 'transfer-order-add',
          params: this.detData
        })
      },
      //查询调拨单详情
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
              that.detData = response.data.data;
              that.detailData = response.data.data.dRequisition;
              that.detailList = response.data.data.detailList;
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
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../reset";
  @import "../../MemberManage/MemberInquiry/member-public-css";

  .transfer-wrapper {
    .titl {
      padding-bottom: 13px;
      border-bottom: 1px solid #E1E1E1;
      margin-bottom: 20px;
      font-size: 15px;
      overflow: hidden;
      h3{
        display: inline-block;
      }
      .el-button{
        float: right;
      }
    }
    .top-box{
      p{
        width: 100%;
        color: #333333;
        font-size: 13px;
        margin-bottom: 10px;
        overflow: hidden;
        span {
          display: inline-block;
          min-width: 182px;
          margin-right: 60px;
          &:last-child{
            margin-right: 0;
          }
          em{
            color: #666666;
            min-width: 60px;
          }
        }
      }
    }
    .el-table th {
      background: #F4F4F4 !important;
    }
  }
</style>
