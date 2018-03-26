<template>
  <div class="content-out-wrapper transfer-wrapper">
    <!--top-->
    <el-row class="inquiry-row top-box mgt20">
      <el-col :span="24" class="titl">
        <h3>调拨单号：R00031612060001 <span class="am-ft-orange mgl30">调拨待审核</span></h3>
        <el-button type="primary" plain @click="goEdit">修改</el-button>
      </el-col>

      <el-col :span="24">
          <p>
            <span><em>制单日期：</em>2017-11-06 11:26:19</span>
            <span><em>制单人：</em>张三</span>
            <span><em>调拨部门：</em>总仓库</span>
          </p>
        <p>
          <span><em>经办日期：</em>2017-11-06 11:26:19</span>
          <span><em>调拨人：</em>张三</span>
          <span><em>调出仓库：</em>总仓库</span>
          <span><em>调入仓库：</em>总仓库</span>
          <span><em>调拨级别：</em>正常</span>
        </p>
        <p>
          <span><em>承运类型：</em>承运人</span>
          <span><em>承运人：</em>15803427765</span>
          <span><em>运费：</em>0</span>
          <span><em>备注：</em>备注内容</span>
        </p>
      </el-col>
    </el-row>
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <h2 class="am-ft-16 mgb15">商品信息</h2>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="tableData"
          stripe
          size="small"
          align="left"
          style="width: 100%">
          <el-table-column
            prop="a"
            label="商品编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="b"
            label="商品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="c"
            label="单位"
            width="50">
          </el-table-column>
          <el-table-column
            prop="d"
            label="注册证号">
          </el-table-column>
          <el-table-column
            prop="e"
            label="批次号">
          </el-table-column>
          <el-table-column
            prop="f"
            label="制单时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="g"
            label="有效期">
          </el-table-column>
          <el-table-column
            prop="h"
            label="调拨数量">
          </el-table-column>
          <el-table-column
            label="调出库库存"
            prop="i">
          </el-table-column>
          <el-table-column
            label="调出库库存"
            prop="i">
          </el-table-column>
          <el-table-column
            label="调入库库存"
            prop="j">
          </el-table-column>
          <el-table-column
            label="公司库存"
            prop="k">
          </el-table-column>
          <el-table-column
            label="零售价"
            prop="l">
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          class="am-ft-right mgt10"
          layout="prev, pager, next"
          :total="10">
        </el-pagination>
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
        tableData: [{
          a: 'BH00001',
          b: '湿乐光学架6670-6054',
          c: '副',
          d: ' ',
          e: ' ',
          f: ' ',
          g: '1',
          h: '1',
          i: '1',
          j: '1',
          k: '1',
          l: '618.00',
        }]
      }
    },
    methods: {
      goEdit() {
        this.$router.push({
          path: '/commodity/transfer-order-add',
          name: 'transfer-order-add',
          params: {}
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
