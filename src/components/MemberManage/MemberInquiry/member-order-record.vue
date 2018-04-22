<template>
  <div class="order-record" v-if="datas!=null">
    <div class="order-record-item" v-for="list in datas" :key="list.names">
      {{datas.orderItems}}
      <div class="item-top">
          <strong class="fn-left order-num">{{list.orderNo}}</strong>
          <span class="fn-left">会员：<strong class="mgr8">{{list.name}}</strong>{{list.telphone}}</span>
          <span class="fn-right">销售：<em class="mgr8">{{list.saleId}}</em>{{list.orderTime}}</span>
      </div>
      <el-table
        :data="list.orderItems"
        :span-method="objectSpanMethod"
        border
        align="left"
        size="small"
        style="width: 100%;">
        <el-table-column
          prop="itemNo"
          label="商品编码">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="商品名称"
          width="280px">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量"
          width="60px">
        </el-table-column>
        <el-table-column
          prop="listPrice"
          label="原单价"
          width="80px">
        </el-table-column>
        <el-table-column
          label="实售单价"
          width="80px">
          <template slot-scope="scope">
            <strong>{{ scope.row.money }}</strong>
          </template>
        </el-table-column>
        <el-table-column
          label="出货仓库">
          <template slot-scope="scope">
            <strong>天一恒泰店</strong>
          </template>
        </el-table-column>
        <!--订单状态：待收银-->
        <el-table-column
          label="取件">
          <template slot-scope="scope">
            <strong>未取件</strong>
          </template>
        </el-table-column>
        <!--/订单状态：待收银-->
        <!--订单状态：已完成-->
        <el-table-column
          label="取件时间">
          <template slot-scope="scope">
              {{list.glassesTime}}
          </template>
        </el-table-column>
        <!--/订单状态：已完成-->
        <el-table-column
          label="订单金额"
          width="120px">
          <template slot-scope="scope">
            <strong class="am-ft-22 mgb15">应付:{{list.moneyAmount}}</strong>
            <p class="am-ft-12 am-text-normal" v-show="list.couponMoney>0">卡券 :<strong class="am-ft-13">{{list.couponMoney}}</strong></p>
            <p class="am-ft-12 am-text-normal" v-show="list.discountMoney>0">折扣 :<strong class="am-ft-13">{{list.discountMoney}}</strong></p>
            <p class="am-ft-12 am-text-normal" v-show="list.activityMoney>0">活动 :<strong class="am-ft-13">{{list.activityMoney}}</strong></p>
          </template>
        </el-table-column>
        <el-table-column
        align="center">
          <template slot-scope="scope">
            <p class="am-ft-red">{{list.statusName=='记账'?'待付款':list.statusName}}</p>
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
      datas:null,
    };
  },
  props:{
    orderTempList:{
      type:Array,
      default:null
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let _this = this;
      if (columnIndex === 8 || columnIndex === 9 || columnIndex === 10) {
        if (rowIndex  === 0) {
          return {
            rowspan: 20,
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
  },
  created(){
    this.datas = this.orderTempList;
      console.log(this.datas)
  }
};
</script>

<style lang="scss">
.content-out-wrapper-md {
  margin: 10px 15px;
}
.order-record {
  .order-record-item {
    width: 100%;
    line-height: 24px;
    margin-top: 10px;
    margin-bottom: 20px;
    .item-top {
      font-size: 12px;
      color: #555555;
      padding: 0 25px;
      margin-bottom: 10px;
      overflow: hidden;
      .order-num {
        font-size: 18px;
        margin-right: 30px;
      }
    }
  }
  .el-table td,
  .el-table th.is-leaf {
    border-color: #efefef !important;
  }
  .el-table th {
    background-color: #fff4e5 !important;
    color: #555555;
    border: 0;
  }
  .el-table .cell,
  .el-table th div,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding-left: 20px;
  }
}
</style>
