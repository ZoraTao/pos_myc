<template>
  <div class="order-record">
    <div class="order-record-item" v-for="list in orderList">
      <div class="item-top">
          <strong class="fn-left order-num">{{list.a}}</strong>
          <span class="fn-left">会员：<strong class="mgr8">张三</strong>15346756523</span>
          <span class="fn-right">销售：<em class="mgr8">王二</em>2017-12-22 22:10:09</span>
      </div>
      <el-table
        :data="tableData6"
        :span-method="objectSpanMethod"
        border
        align="left"
        size="small"
        style="width: 100%;">
        <el-table-column
          prop="a"
          label="商品编码">
        </el-table-column>
        <el-table-column
          prop="b"
          label="商品名称"
          width="280px">
        </el-table-column>
        <el-table-column
          prop="c"
          label="数量"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="d"
          label="原单价"
          width="80px">
        </el-table-column>
        <el-table-column
          label="实售单价"
          width="80px">
          <template slot-scope="scope">
            <strong>{{ scope.row.e }}</strong>
          </template>
        </el-table-column>
        <el-table-column
          prop="f"
          label="出货仓库">
        </el-table-column>
        <!--订单状态：待收银-->
        <el-table-column
          prop="g"
          label="取件">
        </el-table-column>
        <!--/订单状态：待收银-->
        <!--订单状态：已完成-->
        <el-table-column
          v-if="false"
          prop="h"
          label="取件时间">
        </el-table-column>
        <!--/订单状态：已完成-->
        <el-table-column
          label="订单金额"
          width="120px">
          <template slot-scope="scope">
            <strong class="am-ft-22 mgb15">1299.00</strong>
            <p class="am-ft-12 am-text-normal">卡券 :<strong class="am-ft-13">－20</strong></p>
            <p class="am-ft-12 am-text-normal">折扣 :<strong class="am-ft-13">－50</strong></p>
            <p class="am-ft-12 am-text-normal">活动 :<strong class="am-ft-13">－20</strong></p>
          </template>
        </el-table-column>
        <el-table-column
        align="center">
          <template slot-scope="scope">
            <p class="am-ft-red">待收银</p>
            <!--订单状态：已完成-->
            <p v-if="false" class="am-text-placeholder">已完成</p>
            <!--/订单状态：已完成-->
            <p><a href="javascript:;" class="am-text-normal">查看详情</a></p>
          </template>
        </el-table-column>
        <!--订单状态：待收银-->
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <strong class="am-ft-yellow am-ft-22">1299.00</strong>
            <el-button class="mgt15" type="primary" size="small">收银</el-button>
          </template>
        </el-table-column>
        <!--/订单状态：待收银-->
      </el-table>
    </div>
    <!--/订单列表-->
  </div>
</template>

<script>
  export default {
    name: "member-order-record",
    data() {
      return {
        orderList: [{
          a: '20170909000000001',
          b: '待收银',
          tableData: []
        },
        {
          a: '20170909000000002',
          b: '已完成',
          tableData: []
        }],
        tableData6: [{
          id: '',
          a: '562536256452',
          b: '右镜片：毛源昌1.55非球面防辐射远+1.50',
          c: '1',
          d: '230.00',
          e: '134.00',
          f: '天一恒泰店',
          g: '未取件',
          h: '2017-10-22 13:23:45'
        }, {
        id: '',
        a: '562536256452',
        b: '右镜片：毛源昌1.55非球面防辐射远+1.50',
        c: '1',
        d: '230.00',
        e: '134.00',
        f: '天一恒泰店',
        g: '未取件',
        h: '2017-10-22 13:23:45'
      }, {
        id: '',
        a: '562536256452',
        b: '右镜片：毛源昌1.55非球面防辐射远+1.50',
        c: '1',
        d: '230.00',
        e: '134.00',
        f: '天一恒泰店',
        g: '未取件',
        h: '2017-10-22 13:23:45'
      }, {
        id: '',
        a: '562536256452',
        b: '右镜片：毛源昌1.55非球面防辐射远+1.50',
        c: '1',
        d: '230.00',
        e: '134.00',
        f: '天一恒泰店',
        g: '未取件',
        h: '2017-10-22 13:23:45'
        }]
      };
    },
    methods: {
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 7 || columnIndex === 8 || columnIndex === 9) {
          if (rowIndex % this.tableData6.length === 0) {
            return {
              rowspan: this.tableData6.length,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .content-out-wrapper-md{
    margin: 10px 15px;
  }
  .order-record {
    .order-record-item{
      width: 100%;
      line-height: 24px;
      margin-top: 10px;
      margin-bottom: 20px;
      .item-top{
        font-size: 12px;
        color: #555555;
        padding: 0 25px;
        margin-bottom: 10px;
        overflow: hidden;
        .order-num{
          font-size: 18px;
          margin-right: 30px;
        }
      }
    }
    .el-table td, .el-table th.is-leaf {
      border-color: #EFEFEF !important;
    }
    .el-table th {
      background-color: #FFF4E5 !important;
      color: #555555;
      border: 0;
    }
    .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 20px;
    }
  }
</style>
